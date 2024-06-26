"use client"
import Image from "next/image"
import Link from "next/link"
import { Toaster, toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import axios from "axios"
  
export function Login() {
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [isOtpsent,setIsOtpsent]=useState(false);
    const handleChange = (e)=>{
    if(e.target.name=="email"){
        setEmail(e.target.value);
    }
    else if(e.target.name=="otp"){
        setOtp(e.target.value); 
    }
}
const handleOtpSend = async()=>{
  if(email==""){
    toast.error("Please enter your email");
    return
  }
   let data = await axios.post("/api/auth",{email:email})
    if(data.data.success){
        setIsOtpsent(true);
        toast.success(data.data.message)
    }
    else{
      toast.error(data.data.message);
    }
}
const hanldeVerifyOtp = ()=>{ 

}
console.log(otp);
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <Toaster position="top-center"  expand={false}/>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
          <div className="flex justify-center items-center my-4">
      <Image 
        src="https://res.cloudinary.com/dst73auvn/image/upload/v1714112756/logogif_slfyto.gif" 
        alt="My Image"
        width={65} // Specify the width of the image
        height={65} // Specify the height of the image
      />
    </div>
            <h1 className="text-3xl font-bold">Login to DI-LMS</h1>
            <p className="text-balance text-muted-foreground ">
              Enter your email to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            {!isOtpsent&&<div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                onChange={handleChange}
                value={email}
                required
              />
            </div>}
            {isOtpsent&&<div className="grid gap-2 flex justify-center">
              <Label htmlFor="email">Otp (One Time Password)</Label>
              <InputOTP maxLength={6} onChange={(value)=>{setOtp(value)}}>
  <InputOTPGroup className="text-4xl">
    <InputOTPSlot index={0}  />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    </InputOTPGroup>
    <InputOTPSeparator/>
    <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
    </InputOTPGroup>

</InputOTP>

            </div>}
            {/* <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div> */}
            {!isOtpsent&&<Button type="submit" className="w-full" variant="devsindia" onClick={handleOtpSend}>
              Send Otp
            </Button>}
            {isOtpsent&&<Button type="submit" className="w-full" variant="devsindia">
              Login
            </Button>}
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/dilms.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
