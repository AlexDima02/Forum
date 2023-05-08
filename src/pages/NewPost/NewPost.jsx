import React, { useCallback, useEffect, useState } from 'react'
import { UserAuth } from '../../components/contexts/AuthContext';
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';
import MDEditor,  { commands } from '@uiw/react-md-editor';
import rehypeSanitize from 'https://esm.sh/rehype-sanitize@5'
import ImageUploader from './component/ImageUploader';

function NewPost() {

    // Post state
    const [ title, setTitle ] = useState('');
    const [body, setBody] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    console.log(body)
    console.log(imageUrl)
    console.log(title)
    const { userPosts, setMessage, pushMessages, getMessages, user } = UserAuth();
    

    const image = {
        name: 'image',
        keyCommand: 'image',
        buttonProps: { 'aria-label': 'Insert image' },
        icon: (
            <svg viewBox="0 0 1024 1024" width="12" height="12">
                <path
                fill="currentColor"
                d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
                />
            </svg>
        ),
        async execute(state, api){
          // OPEN my component. 
      
            // example
            // const [image, setImage] = useState('');
            return (
                <ImageUploader />
            )
            console.log(image)
            //   let image_url = await upload_image(image);
        
            //   let modifyText = `![](${image_url})\n`;
            //   api.replaceSelection(modifyText);
        },
    };    



    

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        try{

            setMessage(body, title, user);
            pushMessages()
            console.log('Post uploaded!');
            getMessages();
            setBody('');
            setTitle('');
           
        }catch(e){

            console.log(e.message);

        }

        
    }

  return (
    <div>
        <div className='max-w-6xl m-auto mt-5'>
            <div className='flex w-full place-content-start px-5 mb-10'>
                <div className='flex w-full place-content-between'>
                    <div>
                        <h1 className='text-white font-bold text-3xl'>Create Post</h1>
                    </div>
                    <div>
                        <a href="/" className='font-bold bg-primary-color p-3 rounded-md text-white w-fit'>X</a>
                    </div>
                </div>
            </div>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <div className='bg-primary-color rounded-lg md:p-10'>
                    <div className='max-w-5xl m-auto'>
                        <div className='w-full'>
                            <div className='w-full'>
                                <textarea onChange={(e) => setTitle(e.target.value)} id='title' rows="2" className="bg-secondary-color p-5 block w-full text-3xl font-bold text-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="New post title here..." required></textarea>
                            </div>

                            {/* <div className='flex place-content-around w-full m-auto bg-gray-800 text-white py-5 my-5'>
                                <div> 
                                    <button className='bg-button-color w-20 h-20'>B</button>
                                </div>
                                <div>
                                    <button className='bg-button-color w-20 h-20'>I</button>
                                </div>
                                <div>
                                    <input className='bg-button-color w-20 h-20' type='file' accept='image/*' />
                                </div>
                                <div>
                                    <button className='bg-button-color w-20 h-20'>Link</button>
                                </div>
                            </div> */}

                            <div className='w-full' data-color-mode='dark'>

                                <MDEditor
                                    value={body}
                                    onChange={setBody}
                                    previewOptions={{
                                        rehypePlugins: [[rehypeSanitize]],
                                    }}
                                    commands={[
                                        commands.group([commands.title1, commands.title2, commands.title3, commands.title4, commands.title5, commands.title6], {
                                            name: 'title',
                                            groupName: 'title',
                                            buttonProps: { 'aria-label': 'Insert title'}
                                        }), commands.bold, commands.hr, commands.italic, commands.codeBlock, commands.strikethrough, commands.link, commands.quote, commands.divider, commands.checkedListCommand, commands.orderedListCommand, commands.unorderedListCommand 
                                        
                                        // Custom Toolbars
                                        
                                    ]}
                                    extraCommands={[
                                        commands.group([], {
                                          name: 'photo',
                                          groupName: 'photo',
                                          icon: (
                                            <svg viewBox="0 0 1024 1024" width="12" height="12">
                                              <path fill="currentColor" d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z" />
                                            </svg>
                                          ),
                                          children: () => {
                                            return (
                                               
                                              <div style={{ width: 120, padding: 10 }}>
                                                 <ImageUploader  onGetUrl={setImageUrl}/>
                                                {/* <div>My Custom Toolbar</div>
                                                <button type="button" onClick={() => console.log('> execute: >>>>>', getState())}>State</button>
                                                <button type="button" onClick={() => close()}>Close</button>
                                                <button type="button" onClick={() => execute()}>Execute</button> */}
                                              </div>
                                            );
                                          },
                                          execute: (state, api)  => {

                                                console.log(state)
                                                    // if(state.selectedText === ''){

                                                        let modifyText = `![](${imageUrl})\n`;
                                                        api.replaceSelection(modifyText);
                                                    // }
                                                    
                                                   
                                          },
                                          buttonProps: { 'aria-label': 'Insert photo'}
                                        }),
                                        
                                      ]}
                                />
                                
                            </div>

                            <div className='w-full flex place-content-end'>

                                <div className='w-fit my-5'>

                                    <button type='submit' className='bg-button-color rounded-md px-5 py-2 font-bold text-white'>Publish</button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                </form>

            </div>
            
        
    </div>
  )
}

export default NewPost;
