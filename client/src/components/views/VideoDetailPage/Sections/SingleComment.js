import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Comment, Avatar, Button, Input } from 'antd';
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;
function SingleComment(props) {

    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variable = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }
      
        Axios.post('/api/comment/saveComment', variable)
        .then(response => {
            if(response.data.success) {
            console.log(response.data.result)
            setCommentValue("")
            setOpenReply(false)
            props.refreshFunction(response.data.result)
            } else {
            alert('코멘트를 저장하지 못 했습니다.')
            }
        })
    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />
        ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to</span>
    ]
  return (
    <div>
        {props.comment.writer && (
        <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} alt />}
            content={ <p> {props.comment.content} </p>}
        />
        )}
        {OpenReply && 
            <form style={{ display: 'flex' }} omSubmit={onSubmit} >
            <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder='코멘트를 작성해 주세요'
            />
            <br />
            <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</button>
            </form>
        }
    </div>
    
  )
}

export default SingleComment