import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from '../hooks/use-selection';
import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
import { TelegramUsersTable } from '../sections/customer/TelegramUsers-table';
import { CustomersSearch } from '../sections/customer/customers-search';
import { applyPagination } from '../utils/apply-pagination';
import { useDispatch, useSelector } from '../../lib/redux/store';
import { fetchAdminData } from '../../lib/Admin/AdminActions';
import { selectAdminDto } from '../../lib/Admin/Admin.selector';
import { useRouter } from 'next/router';
import { selectUserDto } from '../../lib/User/User.selector';

const now = new Date();

const useCustomers = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage,data]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers != undefined && customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const router = useRouter();
  const userDto = useSelector(selectUserDto)

  //получить данные с сервера admin
  const dispatch = useDispatch();
  const adminData = useSelector(selectAdminDto)
  const customers = useCustomers(adminData,page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  if(userDto?.role != "admin")
  {
    router.replace({ pathname: '/404' }).catch(console.error);
  }

  useEffect(() => {
    console.log("test adminData useEffect");
    dispatch(fetchAdminData());
  }, [dispatch]);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    [adminData]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    [adminData]
  );

  return (
    <>
      <Head>
        <title>
          Customers | Dashboard
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  TelegramUsers
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <TelegramUsersTable
              count={adminData.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
