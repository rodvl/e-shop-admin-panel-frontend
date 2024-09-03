import { Button, Card, Input, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Card raised sx={{width: 'fit-content', padding: '32px', margin: 'auto', marginTop:'64px', display: 'flex', gap: '32px', flexWrap: 'wrap', height: '80vh', maxWidth: '520px'}}>
            <Typography variant="h4" align="center" sx={{width: '100%', marginBottom: '16px'}}>Faça login para começar</Typography>
            <Input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} sx={{width: '100%'}}/>
            <Input placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} sx={{width: '100%'}} type="password"/>
            <Button variant="contained" sx={{margin: 'auto'}}>Entrar</Button>
        </Card>
    );
}
