import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/@/components/ui/dialog"
const Loading =({open})=>{
return (
    <Dialog open={open}>
    <DialogContent className="sm:max-w-[425px] aspect-square justify-evenly ">
      <DialogHeader>
        <DialogTitle className="my-[auto]">Loading</DialogTitle>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);
};

export default Loading;