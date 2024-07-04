const CourseData = async()=>{
    try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/intern`,{
        method:"GET",
        headers:{
          "content-type":"application/json",
        
        }
       })
      const res = await response.json();
      return res;
    }
    catch(err){
        retutn [{message:"Something went wrong!",success:false}]
    }
}
export {CourseData}