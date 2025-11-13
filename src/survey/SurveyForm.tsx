'use client';

import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Star, HelpCircle } from "lucide-react";
import type { SurveyConfig, SurveyQuestion } from "@/src/config/survey-questions";

interface SurveyFormProps {
  config: SurveyConfig;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ config }) => {
  // All hooks must be called before any conditional returns
  const [formData, setFormData] = useState<Record<string, string | number | string[] | null>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Check if a question should be shown based on showIf conditions
  const shouldShowQuestion = useCallback((question: SurveyQuestion): boolean => {
    if (!question.showIf || question.showIf.length === 0) {
      return true;
    }

    return question.showIf.every((condition) => {
      const dependentValue = formData[condition.questionId];
      return condition.in.includes(dependentValue as string);
    });
  }, [formData]);

  // Filter questions based on conditional logic
  const visibleQuestions = useMemo(() => {
    if (!config?.questions) {
      return [];
    }
    return config.questions.filter((question) => shouldShowQuestion(question));
  }, [config?.questions, shouldShowQuestion]);

  // Safety check for config (after all hooks)
  if (!config || !config.meta || !config.questions) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center">
          <CardContent className="pt-6">
            <p className="text-destructive">Error: Survey configuration is missing or invalid.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (questionId: string, value: string | number | string[] | null) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    visibleQuestions.forEach((question) => {
      if (question.required) {
        const value = formData[question.id];
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          newErrors[question.id] = `${question.label} is required`;
        }
      }

      // Email validation for email type questions
      if (question.type === 'email' && formData[question.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[question.id] as string)) {
          newErrors[question.id] = 'Please enter a valid email address';
        }
      }

      // Max selections validation for multi questions
      if (question.type === 'multi' && question.maxSelections) {
        const value = formData[question.id];
        if (Array.isArray(value) && value.length > question.maxSelections) {
          newErrors[question.id] = `Please select at most ${question.maxSelections} option${question.maxSelections > 1 ? 's' : ''}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email || null,
          responses: formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to submit survey' }));
        throw new Error(errorData.message || 'Failed to submit survey');
      }

      setIsSubmitted(true);
      toast({
        title: "Thank You!",
        description: "Your response has been submitted successfully.",
      });
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "Failed to submit survey. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestionLabel = (question: SurveyQuestion) => {
    return (
      <div className="flex items-center gap-2">
        <Label htmlFor={question.id} className="text-base font-medium">
          {question.label}
          {question.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {question.tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{question.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  const renderQuestion = (question: SurveyQuestion) => {
    if (!shouldShowQuestion(question)) {
      return null;
    }

    const error = errors[question.id];
    const value = formData[question.id];

    switch (question.type) {
      case 'single':
        return (
          <div className="space-y-3">
            {renderQuestionLabel(question)}
            <RadioGroup
              value={value as string || ''}
              onValueChange={(val) => handleInputChange(question.id, val)}
            >
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                  <Label htmlFor={`${question.id}-${option.value}`} className="flex-1 cursor-pointer text-base">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case 'multi': {
        const currentValues = Array.isArray(value) ? (value as string[]) : [];
        const maxSelections = question.maxSelections || Infinity;
        const canSelectMore = currentValues.length < (maxSelections as number);

        return (
          <div className="space-y-3">
            {renderQuestionLabel(question)}
            {question.maxSelections && (
              <p className="text-sm text-muted-foreground">
                Select up to {question.maxSelections} option{question.maxSelections > 1 ? 's' : ''}
              </p>
            )}
            <div className="space-y-3">
              {question.options?.map((option) => {
                const isChecked = currentValues.includes(option.value);
                const isDisabled = !isChecked && !canSelectMore;
                return (
                  <div key={option.value} className={`flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <Checkbox
                      id={`${question.id}-${option.value}`}
                      checked={isChecked}
                      disabled={isDisabled}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          if (canSelectMore) {
                            handleInputChange(question.id, [...currentValues, option.value]);
                          }
                        } else {
                          handleInputChange(question.id, currentValues.filter((v) => v !== option.value));
                        }
                      }}
                    />
                    <Label htmlFor={`${question.id}-${option.value}`} className={`flex-1 text-base ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );
      }

      case 'scale': {
        const min = question.min || 1;
        const max = question.max || 5;
        const rating = value as number || 0;
        return (
          <div className="space-y-3">
            {renderQuestionLabel(question)}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                {question.leftLabel && <span>{question.leftLabel}</span>}
                {question.rightLabel && <span>{question.rightLabel}</span>}
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: max - min + 1 }, (_, i) => {
                  const starValue = min + i;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => handleInputChange(question.id, starValue)}
                      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                      aria-label={`Rate ${starValue} out of ${max}`}
                    >
                      <Star
                        className={`h-8 w-8 md:h-10 md:w-10 transition-colors ${starValue <= (rating as number)
                          ? 'fill-primary text-primary'
                          : 'fill-none text-muted-foreground'
                          }`}
                      />
                    </button>
                  );
                })}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    {rating} / {max}
                  </span>
                )}
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );
      }

      case 'email':
        return (
          <div className="space-y-2">
            {renderQuestionLabel(question)}
            <Input
              id={question.id}
              type="email"
              placeholder={question.placeholder}
              value={value || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className={error ? 'border-destructive' : ''}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case 'text':
        return (
          <div className="space-y-2">
            {renderQuestionLabel(question)}
            <Textarea
              id={question.id}
              placeholder={question.placeholder}
              value={value || ''}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
              className={error ? 'border-destructive' : ''}
              rows={4}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader className="space-y-6">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl mb-4">{config.meta.thankYouTitle}</CardTitle>
              <CardDescription className="text-lg">
                {config.meta.thankYouBody}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              size="lg"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex items-center justify-center p-4 py-8 md:py-12">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl md:text-3xl">{config.meta.title}</CardTitle>
            <CardDescription className="text-base md:text-lg">
              {config.meta.intro}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {visibleQuestions.map((question) => {
                const rendered = renderQuestion(question);
                return rendered ? <React.Fragment key={question.id}>{rendered}</React.Fragment> : null;
              })}

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : config.meta.ctaLabel}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default SurveyForm;
