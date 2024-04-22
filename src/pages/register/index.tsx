import { useEffect, useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../../components/container'


import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

import { auth } from '../../services/firebaseConnection'
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { AuthContext } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>

export function Register() {
  const { handleInfoUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })


  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }

    handleLogout();
  }, [])


  async function onSubmit(data: FormData){
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user) => {
      await updateProfile(user.user, {
        displayName: data.name
      })

      handleInfoUser({
        name: data.name,
        email: data.email,
        uid: user.user.uid
      })
      
      console.log("CADASTRADO COM SUCESSO!")
      toast.success("Bem vindo ao Leo Automoveis !")
      navigate("/dashboard", { replace: true })

    })
    .catch((error) => {
      console.log("ERRO AO CADASTRAR ESTE USUARIO")
      console.log(error);
    })

  }

  return (
    <Container>
     <div>
      

      </div>
    </Container>
  )
}