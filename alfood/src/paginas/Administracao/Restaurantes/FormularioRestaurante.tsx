import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"
import http from "../../../http"

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(response => setNomeRestaurante(response.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
                .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                })
        } else {
            http.post('restaurantes/', { nome: nomeRestaurante })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso!')
                })
        }


    }

    return (
        <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h6">
                Formulario de Restaurantes
            </Typography>
            <Box component='form' onSubmit={aoSubmeterForm}>
                <TextField required fullWidth value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)} id="standard-basic" label="Nome do Restaurante" variant="standard" />
                <Button sx={{ marginTop:1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante