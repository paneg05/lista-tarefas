import './admin.css'
import {useState,useEffect} from 'react'
import {auth,db} from './../../firebaseConfig/firebaseConnection'
import {signOut} from 'firebase/auth'
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore'

function Admin (){
    const [tarefaInput,setTarefaInput]=useState('')
    const [user,setUser]=useState({})
    const [tarefas,setTarefas]=useState([])
    const [edit,setEdit]=useState({})


    function sort(arrayObj){
        return arrayObj.sort((objA,objB)=>{
            if(objA.createdAt.seconds<objB.createdAt.seconds) return 1
            if(objA.createdAt.seconds>objB.createdAt.seconds) return -1
            
            return 0
        })
    }


    useEffect(()=>{
        async function loadTarefas(){
            const userDatail = localStorage.getItem('@datailUser')
            setUser(JSON.parse(userDatail))

            if(userDatail){
                const data = JSON.parse(userDatail)
                const tarefaRef = collection(db, 'tarefas')
                const q = query(tarefaRef, where('userUid','==',data?.uid))
                const unsub = onSnapshot(q,snapshot=>{
                    let lista = []

                    snapshot.forEach((doc)=>{
                        lista.push({

                            id:doc.id,
                            tarefa:doc.data().tarefa,
                            userUid:doc.data().userUid,
                            createdAt:doc.data().createdAt
                        })
                    })


                    sort(lista)
                    setTarefas(lista)
                    
                })
            }


        }

        loadTarefas()
    },[])

    async function handleRegister(e){
        e.preventDefault()

        if(tarefaInput===''){
            alert('digite uma tarefa')
            return
        }

        if(edit?.id){
            handleUpdateTarefa()
            return
        }

        await addDoc(collection(db,'tarefas'),{
            tarefa:tarefaInput,
            createdAt: new Date(),
            userUid:user?.uid,
        }).then(()=>{
            console.log('tarefa registrada')
            setTarefaInput('')
        }).catch(e=>{
            console.log('erro')
        })
    }

    async function handleUpdateTarefa(){

        const docRef =doc(db,'tarefas',edit.id)
        await updateDoc(docRef,{
            tarefa:tarefaInput
        }).then(()=>{
            alert('tarefa atualizada')
            setEdit({})
            setTarefaInput('')
        }).catch((e)=>{
            console.log('erro ao atualizar')
        })

    }

    async function handleLogout(){
        await signOut(auth)
    }

    async function deleteTarefa(id){
        const docRef = doc(db,'tarefas',id)
        await deleteDoc(docRef) 
    }

    async function editTarefa(item){
       setTarefaInput(item.tarefa)
       setEdit(item)
    }


    return(
        <div className='admin-container'>
            <h1>minhas tarefas</h1>
            <form onSubmit={handleRegister}>
                <textarea
                    onChange={(e)=>setTarefaInput(e.target.value)}
                    value={tarefaInput}
                    placeholder='digite sua tarefa'
                />
                
                {
                Object.keys(edit).length>0? ( <button className='btn-register' type='submit'>Atualizar tarefa</button> ):( <button className='btn-register' type='submit'>Registrar tarefa</button> )
                
                }
               
            </form>

            {
                tarefas.map((item)=>{

                    return(
                        <article key={item.id} className='list'>
                            <p>{item.tarefa}</p>
                            <div>
                                <button onClick={()=>editTarefa(item)}>Editar</button>
                                <button onClick={()=>deleteTarefa(item.id)} className='btn-delete'>Excluir</button>
                            </div>
                        </article>
                    )
                    

                })
            }

            <button onClick={handleLogout} className='btn-logout'>Logout</button>
        </div>
    )
}


export default Admin