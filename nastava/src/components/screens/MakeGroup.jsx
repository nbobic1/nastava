import {Button} from "@/@/components/ui/button"
import { Input } from "@/@/components/ui/input"
import { useState} from "react"
import { useEffect } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/@/components/ui/table"
import Loading from "../Loading";




const MakeGroup = ({}) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
  


    const [nazivGrupe, setNazivGrupe] = useState('');

    const dodajGrupu = () => {
        setOpen(true)
        console.log("ovdje mi ispisuje: " + nazivGrupe);
        axios.post('http://localhost:3000/makeGroup', {groupname: nazivGrupe,username:localStorage.getItem('username')},
        {
        withCredentials: true,
            headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            }})
            .then(function (response) {
                setOpen(false)
            console.log('neki restponse',response.data,JSON.stringify(response));
            })
            .catch(function (error) {
                setOpen(false)
            console.log('neki error',error,JSON.stringify(error));
        });
    }
    return(
        <div className="flex-row justify-around flex mb-5" style={{display: 'block'}}>
            <Loading open={open}></Loading>
            <Input placeholder="" className="mt-10" value={nazivGrupe} onChange={(e)=>{setNazivGrupe(e.target.value)}}/>
            <Button onClick={dodajGrupu} className="my-5">Dodaj grupu</Button>
            <h1>Postojece grupe</h1>
            <Table style={{ border: '0.5px solid black' }}>
                <TableHeader>
                    <TableRow>
                    <TableHead >Id</TableHead>
                    <TableHead >Naziv grupe</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((data) => (
                    <TableRow key={data.id}>
                        <TableCell className="text-left">{data.id}</TableCell>
                        <TableCell className="text-left">{data.groupname}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>          
        </div>
    )
}


export default MakeGroup;