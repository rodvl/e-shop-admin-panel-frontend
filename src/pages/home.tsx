import { Box, Button, Card, CardActions, CardContent, CircularProgress, Grid2, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import api from "../services/admin-panel";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Category } from "@/types/Category";

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const {data} = await api.get<Category[]>('/category')
            setCategories(data);
            setLoading(false);
        }
        getData();
    }, [])

    const handleCreateCategory = async () => {
        try{
            const {data} = await api.post<Category>('/category', {name: newCategoryName});
            setNewCategoryName("");
            setCategories(prev => [...prev, data]);
        } catch(e) {
            console.log('Error saving category', e)
        }
    }

    return (
        <Box sx={{padding: '32px'}}>
            <Typography variant="h4">Categorias</Typography>
            <Grid2 container spacing={30}>
                
                {loading ? <CircularProgress/> : <Grid2 size={4}>
                    <List>
                        {categories.map(e => (<ListItemButton onClick={() => router.push(`/category/${e.id}`)}><ListItemText primary={e.name} /></ListItemButton>))}
                    </List>
                </Grid2>}

                <Grid2 size={8}>
                    <Card sx={{minWidth: '20%'}}>
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{marginBottom: '16px'}}>
                                Criar categoria
                            </Typography>
                            <TextField sx={{width: '100%'}}placeholder="Nome" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)}/>
                        </CardContent>
                        <CardActions>
                        <Button sx={{margin: 'auto'}} variant="contained" onClick={handleCreateCategory}>Criar</Button>
                        </CardActions>
                    </Card>
                </Grid2>
            </Grid2>
        </Box>
    );
}
