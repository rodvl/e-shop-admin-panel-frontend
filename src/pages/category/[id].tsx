import api from '@/services/admin-panel';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Grid2, Input, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import CreateProductModal from '@/components/CreateProductModal';

const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [openedCreateModal, setOpenedCreateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const getData = async () => {
            const {data} = await api.get<Category[]>('/category')
            const {data:products} = await api.get<Product[]>(`/product/category/${id}`)
            setCategories(data);
            setProducts(products)
            setLoading(false);
        }
        if(id) getData();
    }, [id])

    const currentCategory = useMemo(() => categories?.find(e => e.id === id), [categories])

    const handleOnUpdateProducts = async () => {
        setLoading(true);
        try{
            const {data:products} = await api.get<Product[]>(`/product/category/${id}`)
            setProducts(products)
            setLoading(false);
        } catch(e) {
            console.log('Error fetching products', e)
            setLoading(false);
        }
    }

    return (
        <Box sx={{padding: '32px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                <Typography variant="h4" sx={{width: '40%'}}>Produtos da categoria: {currentCategory?.name}</Typography>
                <div>
                    <Button onClick={() => setOpenedCreateModal(true)} disabled={loading}>Criar produto</Button>
                    <Button onClick={() => router.push(`/home`)} color='secondary'>Voltar</Button>
                </div>
            </Box>
                {loading ? <CircularProgress/> : (
                        <Grid2 container spacing={2}>
                            {products.filter(e => e.categoryId === id).map(e => (
                                <Grid2 size={4}>
                                    <Card sx={{minWidth: '20%'}}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {e.name}
                                            </Typography>
                                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>R$ {e.price}</Typography>
                                            <Typography variant="body2">
                                               {e.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button sx={{margin: 'auto'}} size="small" onClick={() => {setSelectedProduct(e); setOpenedCreateModal(true)}}>Editar</Button>
                                        </CardActions>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                )}
            <CreateProductModal onConfirm={handleOnUpdateProducts} currentCategory={currentCategory} open={openedCreateModal} handleClose={() => {setOpenedCreateModal(false); setSelectedProduct(undefined);}} item={selectedProduct} categories={categories}/>
        </Box>
    );
};

export default CategoryPage;