import { useRouter } from 'next/router';

const CategoryPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Category Page</h1>
            <p>Category ID: {id}</p>
        </div>
    );
};

export default CategoryPage;