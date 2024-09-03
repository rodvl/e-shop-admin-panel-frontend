import api from '@/services/admin-panel';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
    open: boolean;
    handleClose: () => void;
    item?: Product;
    categories: Category[];
    currentCategory?: Category;
    onConfirm: () => Promise<void>;
}

const CreateProductModal: React.FC<Props> = ({open, handleClose, item, currentCategory, categories, onConfirm}) => {
    const [newPrice, setNewPrice] = useState("");
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(currentCategory);

    const handleOnCreate = async () => {
        setLoading(true);
        try{
            const {data} = await api.post<Product[]>('/product', {name: newName, description: newDescription, price: newPrice, imageId: "2709ac67-b404-4778-8dc2-137dc48bc9aa", categoryId: currentCategory?.id});
            setLoading(false);
            handleClearStates();
            await onConfirm();
            handleClose();
        } catch(e) {
            console.log('Error saving product', e)
            setLoading(false);
        }
    }

    const handleOnUpdate = async () => {
        setLoading(true);
        try{
            const {data} = await api.put<Product[]>('/product', {name: newName, description: newDescription, price: Number(newPrice), imageId: "2709ac67-b404-4778-8dc2-137dc48bc9aa", categoryId: selectedCategory?.id, id: item?.id});
            setLoading(false);
            handleClearStates();
            await onConfirm();
            handleClose();
        } catch(e) {
            console.log('Error saving product', e)
            setLoading(false);
        }
    }

    const handleClearStates = () => {
        setNewPrice("");
        setNewName("");
        setNewDescription("");
    }

    const handleChangeCategory = (event: SelectChangeEvent) => {
        const newCategory = categories.find(e => e.id === event.target.value);
        setSelectedCategory(newCategory);
    }

    useEffect(() => {
        setNewPrice(item?.price.toString() || "");
        setNewName(item?.name || "");
        setNewDescription(item?.description || "");
    }, [item]);

    useEffect(() => {
        setSelectedCategory(currentCategory);
    }, [currentCategory]);

    return (
        <Dialog
            open={open}
            onClose={() => {handleClearStates(); handleClose();}}
            PaperProps={{sx:{width: '50%'}}}
            disableEscapeKeyDown
        >
            <DialogTitle id="alert-dialog-title" sx={{textAlign: 'center'}}>
                Criar produto
            </DialogTitle>
            <DialogContent>
                <Box sx={{display:"flex", flexWrap: 'wrap', gap:'16px'}}>
                    <TextField placeholder='Nome' sx={{width: '100%'}} value={newName} onChange={e => setNewName(e.target.value)}/>
                    <TextField placeholder='Descrição' multiline sx={{width: '100%'}} value={newDescription} onChange={e => setNewDescription(e.target.value)}/>
                    <TextField placeholder='Preço' sx={{width: '100%'}} value={newPrice} onChange={e => setNewPrice(e.target.value)}/>
                    {item &&( 
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={selectedCategory?.id}
                                label="Categoria"
                                onChange={handleChangeCategory}
                            >
                                {categories.map(e => <MenuItem value={e.id}>{e.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    )}
                </Box>
            </DialogContent>
            <DialogActions sx={{margin: 'auto'}}>
                <Button onClick={handleClose} disabled={loading}>Fechar</Button>
                <Button onClick={() => {
                    if(item) handleOnUpdate() 
                    else handleOnCreate()
                }} disabled={loading}>Criar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateProductModal;