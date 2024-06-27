"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import ProfilePageSkeleton from "@/utilities/skeleton/ProfilePageSkeleton";
import { Toaster,toast } from "sonner";
import ProfielSpinner from "@/utilities/Spinner/ProfielSpinner";
export default function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [av, setAv] = useState("DI");
  const [score, setScore] = useState(0);
  const [amount,setamount] = useState(0)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    desc: "",
    profile: "",    
  }
  )
const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}
  const router = useRouter();
  const validatesFunc = async (token) => {
    console.log(token);
    setLoading(true);
    const response = await fetch("/api/homeauth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token,
      },
    });
    const res = await response.json();
    setLoading(false);
    console.log(res);
    if (res.success) {
      setData(res.data);
    //avtar name
      let avname = res.data[0].name.split(" ");
      avname = avname[0][0].toUpperCase() + avname[1][0].toUpperCase();
      setAv(avname);
      console.log(avname);
      //score
      let tempscr= 0;
      res.data.map((item)=>{
        tempscr = tempscr+item.score;
      })
      //deriving amount
      
    
      setScore(tempscr/res.data.length);
      //end
      //amount
      res.data.map((item)=>{
        setamount(amount+item.amount);
      })
      //end
      //setting your name
        setForm({
            name:res.data[0].name,
            email:res.data[0].email,
            phone:res.data[0].phone,
            desc:res.data[0].desc,
            profile:res.data[0].profile,
        })
        //end
    } else {
      toast.error(res.message);
      if (res.ansession) {
        setisansession(true);
        setTimeout(() => {
          router.push("/login");
        }, 4000);
      }
      router.push("/login");
    }
  };
  useEffect(() => {
    validatesFunc(localStorage.getItem("dilmstoken"));
  }, [])
  //onsubmit;
  const onSubmitdata = async(e)=>{
    e.preventDefault();
  if(form.name==""||form.email==""||form.phone==""||form.desc==""||form.profile==""){
    toast.error("All fields are required!");
    return;
  }
  setPostLoading(true);
 const response = await fetch("/api/profile",{
    method:"POST",
    headers:{
      "content-type":"application/json",
      token:localStorage.getItem("dilmstoken")
    },
    body:JSON.stringify(form)
 })
setPostLoading(false);
 const res = await response.json();
 if(res.success){
   toast.success(res.message);
 }
    else{
    toast.error(res.message);
    }
  }
  
  return (
    <>
    <Toaster position="top-center" expand={false}/>
    {loading && <ProfilePageSkeleton/>}
    {postLoading && <div className="flex justify-center items-center h-full"><ProfielSpinner/></div>}

    {!loading && !postLoading &&<div className="w-full max-w-5xl mx-auto py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <div className="bg-background rounded-lg p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{av}</AvatarFallback>
            </Avatar>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold">{data && data[0].name}</div>
              <div className="text-muted-foreground">Student</div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                <div className="text-4xl font-bold">{data && data.length}</div>
                <div className="text-muted-foreground">Courses</div>
              </div>
              <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                <div className="text-4xl font-bold">{score}%</div>
                <div className="text-muted-foreground">Total Score</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                <div className="text-4xl font-bold">99+</div>
                <div className="text-muted-foreground">Your Rank</div>
              </div>
              <div className="bg-muted rounded-lg p-4 flex flex-col items-center">
                <div className="text-4xl font-bold"> ₹{amount}</div>
                <div className="text-muted-foreground">Tuition</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Courses</h2>
              <Link
                href="/course"
                className="text-primary hover:underline"
                prefetch={false}
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data&&data.map((item)=>(<Card className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex justify-center items-center flex-col">
                    <img src={item.Regdomain.img} alt="image" className="h-44 w-full object-cover"/>
                    <div className="text-lg font-bold">
                    {item.Regdomain.title}
                  </div>
                    </div>
                </div>
                <p className="text-muted-foreground">
                  {item.Regdomain.desc.slice(0, 100) + "..."}
                </p>
                <Button variant="" className="my-2 w-full">
                    View Now
                </Button>
              </Card>))}
           
             
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Settings</h2>
            </div>
            <Card className="p-4">
            <form onSubmit={onSubmitdata}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Profile</Label>
                  <Input id="profile" type="url" name="profile" value={form.profile} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Phone</Label>
                  <Input id="phone" type="number" name={"phone"} value={form.phone} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Description</Label>
                 <textarea name="desc" id="" rows={8} cols={65} value={form.desc} onChange={handleChange} className="border-2 border-green-200 rounded-lg p-2"  ></textarea>
                </div>
               
              </div>
              <div className="mt-4 flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
}
