import React, { useState } from 'react';
import socket from '../../service/socket';
import { useDropzone } from 'react-dropzone';
import './message.scss';

const MessageInput = ({ user, channelId, channelName }) => {
  const [value, setValue] = useState('');
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([])
  const userId = user?.id
  const data = { user, channelId }

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (files.length > 0) setImage(files[0]);
      sendMessage();
      setValue('');
      setFiles([]);
    }
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setFiles(file);
    console.log(files)
  }

  const sendMessage = () => {
    if (value.trim() === '') return;
    console.log(image)

    let msg;

    if(files[0]){
      msg = {
        messageText: value.trim(),
        userId,
        channelId,
        messageImg: files[0],
      }
    }
    else {
      msg = {
        messageText: value.trim(),
        userId,
        channelId,
        messageImg: null,
      }
    }
    console.log(image)
    socket.emit(`chatMessage`, msg)
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
    maxFileSize: 3097152,
  })

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "100px" }} alt="preview" />
      </div>
    </div>
  ))

  return (
    <div className='messageInputDiv'>
      <div className='dropzone' {...getRootProps()}>
        <input {...getInputProps()} />
        {/* <i class="fas fa-plus-circle"/> */}
        <i class="fas fa-image"/>
      </div>
      <textarea
        maxlength='140'
        onChange={e => setValue(e.target.value)}
        onKeyPress={ keyPress }
        value={ value }
        className='messageInputTextarea'
        placeholder={`Message # ${channelName}`}>
      </textarea>
      <div className='preview'>
        { files[0] &&
          <div onClick={() => setFiles([])}>
            <i class="fas fa-window-close"/>
          </div>
        }
        {images}
      </div>
    </div>
  )
}

export default MessageInput