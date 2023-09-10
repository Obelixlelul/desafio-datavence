'use-client';
import { useContext, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { UseFormReturn, useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    TextField,
    styled
} from '@mui/material';
import { FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa';
import { NotificationContext } from '@/contexts/NotificationContext';

type FormFiliacaoProps = {
    back: () => void;
};

const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
`;

type FormValues = {
    email: string;
    password: string;
    cep: string;
    logradouro: string;
    numero: number;
    cargo: string;
    genero: string;
    aceite_termos: string;
    file: FileList;
    uf: string;
    cidade: string;
    bairro: string;
};

const schema = yup.object({
    email: yup
        .string()
        .email('O formato do e-mail não é valido!')
        .required('Email é obrigatório!'),
    password: yup
        .string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres!')
        .required(),
    file: yup
        .mixed()
        .test('fileType', 'Formato de arquivo não suportado', (value: any) => {
            if (!value) return true; // Permite campos vazios (nenhum arquivo selecionado)

            const supportedFormats = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'image/gif',
                'application/pdf'
            ];

            return supportedFormats.includes(value.type);
        })
});

export default function FormFiliacao({ back }: FormFiliacaoProps) {
    const form = useForm<FormValues>({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, watch, reset, formState, clearErrors } =
        form;

    const { errors } = formState;

    const cep = watch('cep');

    const { showNotification } = useContext(NotificationContext);

    const [isLoading, setIsLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertMessage, setOpenAlertMessage] = useState('');

    // Estados de controle do formulario
    const [showPassword, setShowPassword] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    // Estados da requisição do endereço
    const [logradouro, setLogradouro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [bairro, setBairro] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    async function sendSubmit(data: any) {
        setIsLoading(false);

        console.log(data);

        const formData = new FormData();
        formData.set('aceite_termos', data.aceite_termos);
        formData.set('bairro', data.bairro);
        formData.set('cargo', data.cargo);
        formData.set('cidade', data.cidade);
        formData.set('email', data.email);
        formData.set('logradouro', data.logradouro);
        formData.set('numero', data.numero);
        formData.set('uf', data.uf);
        formData.set('file', data.file);

        // try {
        //     const resp = await axios.post(
        //         'http://api.webhookinbox.com/i/h30m6VMB/in/',
        //         data
        //     );
        //     if (resp) {
        //         showNotification('success', 'Dados enviados com sucesso!');
        //         reset();
        //         back();
        //     }
        // } catch (err) {
        //     console.log('erro capturado = ', err);
        // } finally {
        //     setIsLoading(false);
        // }

        // console.log('data = ', data);
    }

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        form.setValue('file', file);
        if (file) {
            setFileName(file.name);
            clearErrors('file');
        }
        setSelectedFile(file);
    };

    async function getAdressByCEP(cep: string) {
        setIsLoading(true);
        try {
            const resp = await axios.get(
                `https://viacep.com.br/ws/${cep}/json/`
            );

            setLogradouro(resp.data.logradouro);
            setCidade(resp.data.localidade);
            setUf(resp.data.uf);
            setBairro(resp.data.bairro);

            form.setValue('logradouro', resp.data.logradouro);
            form.setValue('cidade', resp.data.localidade);
            form.setValue('uf', resp.data.uf);
            form.setValue('bairro', resp.data.bairro);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (cep && cep.length === 9) {
            const cepNumerico = cep.replace(/\D/g, '');
            getAdressByCEP(cepNumerico);
        }
    }, [cep]);

    return (
        <>
            <div className="bg-slate-200 w-[600px] min-h-[20rem] p-6 rounded-2xl">
                <h2 className="mb-4">FORMULÁRIO DE FILIAÇÃO</h2>

                <form autoComplete="off" onSubmit={handleSubmit(sendSubmit)}>
                    <FormControl
                        fullWidth
                        variant="outlined"
                        style={{ marginBottom: '1rem' }}
                    >
                        <TextField
                            label="Email"
                            required
                            variant="outlined"
                            color="secondary"
                            type="email"
                            fullWidth
                            {...register('email')}
                        />
                        <p className="error text-red-600">
                            {errors.email?.message}
                        </p>
                    </FormControl>

                    <FormControl
                        fullWidth
                        variant="outlined"
                        style={{ marginBottom: '1rem' }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <FaEye size={16} />
                                        ) : (
                                            <FaEyeSlash size={16} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            {...register('password')}
                        />
                        <p className="error text-red-600">
                            {errors.password?.message}
                        </p>
                    </FormControl>

                    <InputMask mask="99999-999" maskChar={null}>
                        {({ onChange }) => (
                            <TextField
                                label="Cep"
                                required
                                variant="outlined"
                                color="secondary"
                                sx={{ mb: 3 }}
                                fullWidth
                                type="text"
                                onChange={onChange}
                                inputProps={{ ...register('cep') }}
                            />
                        )}
                    </InputMask>

                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            {' '}
                            <TextField
                                label="Logradouro"
                                required
                                variant="outlined"
                                color="secondary"
                                sx={{ mb: 3 }}
                                fullWidth
                                type="text"
                                inputProps={{
                                    value: logradouro,
                                    ...register('logradouro')
                                }}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                label="Numero"
                                required
                                variant="outlined"
                                color="secondary"
                                sx={{ mb: 3 }}
                                fullWidth
                                type="number"
                                {...register('numero')}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Cidade"
                                required
                                variant="outlined"
                                color="secondary"
                                sx={{ mb: 3 }}
                                fullWidth
                                type="text"
                                inputProps={{
                                    value: cidade,
                                    ...register('cidade')
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Logradouro"
                                required
                                variant="outlined"
                                color="secondary"
                                sx={{ mb: 3 }}
                                fullWidth
                                type="text"
                                inputProps={{
                                    value: uf,
                                    ...register('uf')
                                }}
                            />
                        </Grid>
                    </Grid>

                    <FormControl
                        style={{ marginBottom: '1rem' }}
                        required
                        fullWidth
                    >
                        <InputLabel>Selecione o cargo pretendido</InputLabel>
                        <Select
                            label="Selecione o cargo pretendido"
                            inputProps={{
                                MenuProps: { disableScrollLock: true },
                                ...register('cargo')
                            }}
                            defaultValue={'vereador'}
                            placeholder="Selecione o cargo pretendido"
                        >
                            <MenuItem value={'vereador'}>Vereador</MenuItem>
                            <MenuItem value={'deputado_estadual'}>
                                Deputado Estadual
                            </MenuItem>
                            <MenuItem value={'prefeito'}>Prefeito</MenuItem>
                            <MenuItem value={'governador'}>Governador</MenuItem>
                            <MenuItem value={'senador'}>Senador</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: '1rem' }}>
                        <FormLabel>Gênero</FormLabel>
                        <RadioGroup
                            defaultValue="female"
                            name="genero"
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <FormControlLabel
                                value="feminino"
                                control={<Radio />}
                                label="Feminino"
                            />
                            <FormControlLabel
                                value="masculino"
                                control={<Radio />}
                                label="Masculino"
                            />
                            <FormControlLabel
                                value="outro"
                                control={<Radio />}
                                label="Outro"
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl
                        style={{
                            marginBottom: '1rem',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Checkbox
                            style={{ padding: 0 }}
                            {...register('aceite_termos')}
                        />
                        <span className="text-sm">
                            Declaro que aceito receber informações sobre o
                            partido no meu e-mail.
                        </span>
                    </FormControl>

                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<FaUpload size={16} />}
                        href="#file-upload"
                        style={{ marginBottom: '1rem' }}
                        fullWidth
                    >
                        Selecione um arquivo
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                        />
                    </Button>

                    {selectedFile && (
                        <p className="pb-2 mb-2 font-thin text-sm">
                            Arquivo selecionado: {fileName}
                        </p>
                    )}

                    {errors.file?.message && (
                        <p className="text-red-600 pb-2 mb-2 font-thin text-sm">
                            {errors.file?.message}
                        </p>
                    )}

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    reset();
                                    back();
                                }}
                                fullWidth
                            >
                                Voltar
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <CircularProgress
                                            style={{
                                                color: 'white',
                                                marginRight: '.8rem'
                                            }}
                                            size={16}
                                        />
                                    )}
                                    Cadastrar{' '}
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </>
    );
}
