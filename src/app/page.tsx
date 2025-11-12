import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, UserCheck, Zap, BarChart, MapPin } from 'lucide-react';
import { Icons } from '@/components/icons';

export default function Home() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Real-Time Monitoring',
      description: 'Instantly check station availability and energy consumption to plan your charging sessions.',
    },
    {
      icon: <UserCheck className="h-8 w-8 text-primary" />,
      title: 'Secure Authentication',
      description: 'Authorized charging access via RFID or QR code, ensuring a secure and personal experience.',
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: 'Energy Analytics',
      description: 'Track your energy usage, solar generation, and positive environmental impact.',
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: 'Station Locator',
      description: 'Easily find and navigate to the nearest SolarCharge station with our interactive map.',
    },
    {
      icon: <Sun className="h-8 w-8 text-primary" />,
      title: 'Session Management',
      description: 'Remotely start, stop, and schedule your charging sessions with complete control.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">SolarCharge</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-0 m-auto h-[450px] w-full bg-primary/10 blur-3xl"
          ></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground font-headline">
                  Intelligent EV Charging, <span className="text-primary">Powered by the Sun</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
                  Join the green revolution with SolarCharge. We provide smart, reliable, and sustainable charging solutions for your electric vehicle.
                </p>
                <div className="mt-8 flex gap-4 justify-center md:justify-start">
                  <Button size="lg" asChild>
                    <Link href="/dashboard">Access Dashboard</Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative h-64 md:h-auto md:w-full">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="EV charging with solar panels"
                  data-ai-hint="solar panels electric car"
                  fill
                  className="rounded-xl object-cover shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-28 bg-background/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose SolarCharge?</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We're more than just a charging station. We are a complete ecosystem for a sustainable future.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center bg-card/80 backdrop-blur-sm transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SolarCharge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
