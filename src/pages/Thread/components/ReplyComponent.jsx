import React from 'react'

function ReplyComponent(props) {

    console.log(props.replies?.map(el => el.reply));
    const replies = props.replies;

 
    
    

        return (
            <div>
               {replies ? replies?.map((el) => {
                return (
                    <div className='border border-gray-300 p-3 mt-5 rounded-lg h-full w-1/2'>
                        <div className='flex place-content-between'> 
                            <h1>{el.name}</h1>
                            <p>{el.date}</p>
                        </div>
                        <div>

                            <p>{el.reply}</p>

                        </div>
                        <div>


                        </div>
                        
                    </div>
               )
            }) : null}
            </div>
           
        )


    
  
}


export default ReplyComponent;