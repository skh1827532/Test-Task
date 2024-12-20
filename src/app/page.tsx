import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CarsList from "@/components/CarList";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>Car Inventory List</CardTitle>
        </CardHeader>
        <CardContent>
          <CarsList />
        </CardContent>
      </Card>
    </div>
  );
}
