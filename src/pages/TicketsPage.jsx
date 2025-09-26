import React, { useState, useEffect } from 'react';
import Menubar from '../components/Menubar';
import TicketModal from '../components/TicketModal';
import { supabase } from '../supabaseClient';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './TicketsPage.css';

const TicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [ticketToDelete, setTicketToDelete] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, [page, rowsPerPage]);

    const fetchTickets = async () => {
        try {
            const { count } = await supabase
                .from('tickets')
                .select('*', { count: 'exact' });
            
            setTotalCount(count);

            const { data, error } = await supabase
                .from('tickets')
                .select(`
                    *,
                    users!tickets_assigned_to_fkey (name)
                `)
                .range(page * rowsPerPage, (page + 1) * rowsPerPage - 1)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTickets(data || []);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!ticketToDelete) return;

        try {
            const { error } = await supabase
                .from('tickets')
                .delete()
                .eq('ticket_id', ticketToDelete.ticket_id);

            if (error) throw error;

            await fetchTickets();
            setDeleteConfirmOpen(false);
            setTicketToDelete(null);
        } catch (error) {
            console.error('Error deleting ticket:', error);
            alert('Failed to delete ticket. Please try again.');
        }
    };

    const openDeleteConfirm = (ticket) => {
        setTicketToDelete(ticket);
        setDeleteConfirmOpen(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="tickets-page">
            <Menubar />
            <div className="tickets-container">
                <div className="tickets-header">
                    <h1>Tickets</h1>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Create Ticket
                    </Button>
                </div>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="tickets table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Assigned To</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.map((ticket) => (
                                    <TableRow
                                        key={ticket.ticket_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {ticket.title}
                                        </TableCell>
                                        <TableCell>{ticket.status}</TableCell>
                                        <TableCell>{ticket.priority}</TableCell>
                                        <TableCell>
                                            {ticket.users?.name || 'Unassigned'}
                                        </TableCell>
                                        <TableCell>{ticket.category}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => openDeleteConfirm(ticket)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <TicketModal 
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTicketCreated={fetchTickets}
            />
            <Dialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
            >
                <DialogTitle>Delete Ticket</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this ticket? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TicketsPage;