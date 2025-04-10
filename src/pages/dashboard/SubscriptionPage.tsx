
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Sparkles } from "lucide-react";

const SubscriptionPage = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual creators just getting started.",
      features: [
        "1 individual workspace",
        "15 AI generations per month",
        "Basic analytics",
        "Limited content templates",
      ],
      cta: "Current Plan",
      popular: false,
      current: true,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious content creators looking to grow their presence.",
      features: [
        "3 workspaces (team or individual)",
        "Unlimited AI generations",
        "Advanced analytics",
        "Full template library",
        "Up to 5 team members",
        "AI image generation",
      ],
      cta: "Upgrade",
      popular: true,
      current: false,
    },
    {
      name: "Business",
      price: "$49",
      period: "per month",
      description: "For teams managing multiple brands and clients.",
      features: [
        "10+ workspaces",
        "Unlimited AI generations",
        "Premium analytics",
        "Custom templates",
        "Unlimited team members",
        "Dedicated support",
        "Advanced AI image generation",
      ],
      cta: "Contact Sales",
      popular: false,
      current: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Time to Upgrade Your Plan</h1>
        <p className="text-muted-foreground text-lg">
          You've used all your credits for this month. Upgrade to continue creating amazing content.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
        {plans.map((plan, index) => (
          <Card key={index} className={`${plan.popular ? "border-primary shadow-lg" : ""} ${plan.current ? "bg-muted/30" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                MOST POPULAR
              </div>
            )}
            <CardHeader className="relative">
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> / {plan.period}</span>
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""} ${plan.current ? "bg-muted text-muted-foreground cursor-default" : ""}`}
                variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                disabled={plan.current}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">Have questions about our plans?</p>
        <Button variant="outline">Contact Support</Button>
      </div>
    </div>
  );
};

export default SubscriptionPage;
