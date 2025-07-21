"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { mockSessions } from "@/lib/data";
import { format } from "date-fns";

export default function SessionsPage() {
  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">
        Charging Session Management
      </h1>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="history">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Sessions</TabsTrigger>
              <TabsTrigger value="history">Session History</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <Card>
                <CardHeader>
                  <CardTitle>No Active Sessions</CardTitle>
                  <CardDescription>
                    There are currently no active charging sessions. Start one
                    from the panel.
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>
                    Review your past charging sessions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Station ID</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Energy (kWh)</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">{session.stationId}</TableCell>
                          <TableCell>
                            {format(session.startTime, "PPP p")}
                          </TableCell>
                          <TableCell>{session.duration}</TableCell>
                          <TableCell className="text-right">{session.energyConsumed.toFixed(2)}</TableCell>
                          <TableCell className="text-right">₹{session.cost.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Start New Session</CardTitle>
              <CardDescription>
                Enter details to begin a new charging session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="stationId">Station ID</Label>
                    <Input id="stationId" placeholder="e.g., SC-001" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="duration">Charging Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="e.g., 120" />
                  </div>
                  <Button className="w-full">Initiate Charge</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
