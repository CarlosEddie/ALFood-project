import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ITag from "../../../interfaces/ITag"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioPrato = () => {


    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)
    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<{tags: ITag[]}>('tags/')
            .then(response => setTags(response.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(response => setRestaurantes(response.data))
    }, [])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }
    
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant="h6">
                Formulario de Pratos
            </Typography>
            <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField required fullWidth value={nomePrato} onChange={evento => setNomePrato(evento.target.value)} id="standard-basic" label="Nome do Prato" variant="standard" margin="dense" />
                <TextField required fullWidth value={descricao} onChange={evento => setDescricao(evento.target.value)} id="standard-basic" label="Descrição do Prato" variant="standard" margin="dense" />
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => <MenuItem key={tag.id} value={tag.id}>
                            {tag.value}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                            {restaurante.nome}
                        </MenuItem>)}
                    </Select>
                </FormControl>
                <input type="file" onChange={selecionarArquivo}/>
                <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioPrato