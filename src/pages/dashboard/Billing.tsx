
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Billing = () => {
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
      <div>
        <h1 className="text-3xl font-bold mb-2">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and payment information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the Free plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Free Plan</h3>
              <p className="text-sm text-muted-foreground">3 credits remaining</p>
            </div>
            <Button variant="outline">Manage Credits</Button>
          </div>
          
          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium">Plan Includes:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>1 individual workspace</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>15 AI generations per month</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>Limited content templates</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Available Plans</h2>
      <div className="grid md:grid-cols-3 gap-8">
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
              {plan.current ? (
                <Button 
                  className="w-full bg-muted text-muted-foreground cursor-default"
                  variant="outline"
                  disabled
                >
                  {plan.cta}
                </Button>
              ) : (
                <Button 
                  className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  to="/dashboard/subscription"
                  // Fixed: removed the "as" property and used Link component directly
                >
                  <Link to="/dashboard/subscription" className="w-full flex justify-center">
                    {plan.cta}
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Add a payment method to upgrade your plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Add Payment Method</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View your past invoices and payment history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">No billing history available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Billing;
