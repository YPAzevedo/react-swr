import styled from "styled-components";

export const PostItem = styled.li`
  border: 1px solid lightgray;
  margin: 0 auto;
  background: #fafafa;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;

  & +li {
    margin-top: 30px;
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  padding: 10px;

  a {
    text-decoration: none;
    color: #444;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 16px;
    }
  }
`;

export const PostFooter = styled.div`
  width: 400px;
  display: flex;
  padding: 10px;
  flex-direction: column;

  input {
    border: none;
    flex: 1;
  }
`;

export const ActionButtons = styled.div`
    margin-right: auto;
    padding: 10px;

    button {
      cursor: pointer;

      strong {
        margin-left: 5px;
      }

      & + button {
        margin-left: 10px
      }
    }
`;

export const Caption = styled.div`
    margin-right: auto;
    padding: 10px;

    textarea {
      border: none;
      width: 370px;
    }
`;

export const CaptionEdit = styled.form`
  background: white;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  
  textarea {
    font-size: 16px;
    resize: none;
    border-bottom: 1px solid lightgray;
    padding: 10px;
    cursor: text;
    z-index: 100;
  }

  button {
    margin-left: auto;
    margin-right: 5px;
    padding: 5px;
  }
`;
