import React, {
  useState,
  useEffect,
  useRef
} from "react";

import {
  Box, // Add to imports
  Container,
  Grid,
  IconButton, // Add to imports
  List, // Add to imports
  ListItem, // Add to imports
  ListItemText, // Add to imports
  Paper, // Add to imports
} from "@mui/material";

import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const [messages, setMessages] = useState(mockMessages);

const mockMessages = [
  {
    role: 'assistant',
    content: 'Hello, how can I help you today?',
    text: 'Hello, how can I help you today?'
  },
];

const UserMessage = styled('div', { shouldForwardProp: (prop) => prop !== 'audio' })`
  position: relative;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText.main};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  padding-right: ${({ theme, audio }) => (audio ? theme.spacing(6) : theme.spacing(2))};
  border-radius: 1rem;
  border-top-right-radius: 0;
  align-self: flex-end;
  max-width: 80%;
  word-wrap: break-word;
`;

const MessageWrapper = styled('div')`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  justify-content: ${({ align }) => (align === 'user' ? 'flex-end' : 'flex-start')};
`;

const ChatMessages = ({ messages }) => {
  const theme = useTheme();

  return (
    <Container>
      <Box sx={{ width: '100%', mt: 4, maxHeight: 300, minHeight: 300, overflow: 'auto' }}>
        <Paper elevation={0} sx={{ padding: 2 }}>
          <List>
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <ListItemText
                  sx={{ margin: 0 }}
                  primary={
                    <MessageWrapper align={message.role}>
                      {message.role === 'user' ? (
                        <>
                          <UserMessage theme={theme} audio={message.audio}>
                            {message.text}
                            {message.audio && (
                              <IconButton
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: '50%',
                                  right: 8,
                                  transform: 'translateY(-50%)'
                                }}
                                onClick={() => message.audio.play()}
                              >
                                <VolumeUpIcon fontSize="small" />
                              </IconButton>
                            )}
                          </UserMessage>
                        </>
                      ) : (
                        <AgentMessage theme={theme}>
                          {message.text}
                        </AgentMessage>
                      )}
                    </MessageWrapper>
                  }
                />
  
    //  Add list item ref
              </ListItem>
            ))}
            <div ref={bottomRef} /> // Add this ref
          </List>
        </Paper>
   // ........
      </Box>
    </Container>
  )
}

const bottomRef = useRef(null);

useEffect(() => {
  scrollToBottom();
}, [messages]);

const scrollToBottom = () => {
  if (bottomRef.current) {
    if (typeof bottomRef.current.scrollIntoViewIfNeeded === 'function') {
      bottomRef.current.scrollIntoViewIfNeeded({ behavior: 'smooth' });
    } else {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

export default ChatMessages