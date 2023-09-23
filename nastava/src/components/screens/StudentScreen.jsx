import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/@/components/ui/card"

const StudentScreen = () => {
    return(
        <div className="flex-row justify-around flex mb-5" style={{display: 'block'}}>
            <h1>Dostupni testovi za rad</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
      </div>
    )
}

export default StudentScreen;