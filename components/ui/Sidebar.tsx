import { InboxOutlined, MailOutlineOutlined } from '@mui/icons-material';
import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';


const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Draft']



export const Sidebar = () => {

  const { sidemenuOpen, closeSideMenu  } = useContext( UIContext );
  return (
    <Drawer
      anchor="left"
      open={ sidemenuOpen }
      onClose={ closeSideMenu }
    >

      <Box sx={{ width: 250 }}>

        <Box sx={{ padding: '5x 10px' }}>
            <Typography variant='h4'>Menú</Typography>
        </Box>

        <List>
          {
            menuItems.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  { index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
                </ListItemIcon>
                <ListItemText primary={ text } />
              </ListItem>
            ))
          }
        </List>

        <Divider />

        <List>
          {
            menuItems.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  { index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
                </ListItemIcon>
                <ListItemText primary={ text } />
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Drawer>
  )
}