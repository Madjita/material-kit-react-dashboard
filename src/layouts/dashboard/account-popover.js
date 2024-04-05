import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth2 } from 'src/hooks/use-auth';
import { LogOut } from '../../../lib/User/User.thunks'
import { useDispatch,useSelector } from '../../../lib/redux';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const auth2 = useAuth2();
  const router = useRouter();
  const dispatch = useDispatch();
  const userDto = useSelector(state => state.user.userDto)

  /*const handleSignOut = useCallback(
    () => {
      console.log("TEST LOGOUT")
      onClose?.();
      
      //auth2.logOut();
      //auth.signOut(auth.user);
      router.push('/auth/login');
    },
    [onClose, router]
  );*/

  const handleLogOut = async () => {
    try {
      dispatch(LogOut()); // Вызываем функцию LogOut
      // В этом месте можно выполнить дополнительные действия после успешного выхода
    } catch (error) {
      // Обработка ошибки при выходе
      console.log("error: ",error);
    }
  };

  const handleSignOut = useCallback(handleLogOut,
    [onClose, router]
  );



  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
          component={'span'}
        >
          <p>{userDto?.login}</p>
          <p>{userDto?.firstName+" "+userDto?.lastName}</p>
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
