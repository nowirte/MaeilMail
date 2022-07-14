import styled from 'styled-components';

const LetterWrapper = styled.ul`
  overflow: hidden;
  position: relative;
  margin: 200px 1rem 2rem 1rem;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  gap: 1.5rem;
`;

const Letter = styled.li`
  width: 300px;

  border-radius: 1rem;
  box-sizing: border-box;
  padding: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${props =>
    props.future ? 'border: 1px dashed #ccc' : 'border: 1px solid #ccc'};
`;

const LetterHeader = styled.div`
  display: flex;
  justify-content: flex-end;

  & > img {
    width: 3rem;
  }
`;

const LetterContent = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.25rem;
  height: 6.25rem;
  color: #4f4f4f;
`;

const LetterFooter = styled.div`
  display: flex;
  flex-direction: column;
`;

const Writer = styled.p`
  font-size: 1.25rem;
  margin: 0.75rem 0;
  font-weight: bold;
`;

const Date = styled.p`
  font-size: 1rem;
  color: #828282;
`;

const WriteBtn = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  border: 1px solid #ccc;
  outline: none;
  background-color: #ccc;
  color: #333;
  cursor: pointer;
  padding: 1rem 3rem;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: #4f4f4f;
    color: #ccc;
    opacity: 0.2;
  }
`;
export {
  LetterWrapper,
  Letter,
  LetterHeader,
  LetterContent,
  LetterFooter,
  Writer,
  Date,
  WriteBtn,
};
