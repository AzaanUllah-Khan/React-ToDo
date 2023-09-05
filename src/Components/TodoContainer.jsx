import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, db, app } from "../firebase";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');

    const addTodo = async () => {
        try {
            const docRef = await addDoc(collection(db, "todos"), {
                todo: todoText
            });
            Swal.fire({
                title: `Todo Added`,
                icon: 'success'
            }).then(() => {
                showTodos();
            })
            setTodoText('');
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const showTodos = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const todoList = [];
        querySnapshot.forEach((doc) => {
            todoList.push({
                id: doc.id,
                text: doc.data().todo,
            });
        });
        setTodos(todoList);
    };

    useEffect(() => {
        showTodos();
    }, []);

    const delTodo = (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteDoc(doc(db, "todos", id));
                    Swal.fire(
                        'Deleted!',
                        'Your Todo has been deleted.',
                        'success'
                    )
                }
            }).then(() => {
                showTodos();
            })
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const upTodo = async (id) => {
        const azaan = doc(db, "todos", id);
        try {
            const { value } = await Swal.fire({
                title: `Enter Value to Replace`,
                input: 'text',
                inputPlaceholder: 'Enter new value...',
                confirmButtonText: 'Replace / Edit !',
                showLoaderOnConfirm: true,
            });

            if (value) {
                await updateDoc(azaan, {
                    todo: `${value} (edited on ${new Date().getHours()}:${new Date().getMinutes()})`
                });
                showTodos();
            }
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    return (
        <>
            <h3 className="title">Todo List</h3>
            <div className="control">
                <input
                    type="text"
                    id="entry"
                    placeholder="e.g. some stuffs"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                />
                <button
                    id="submit"
                    className="btn submit-btn"
                    onClick={addTodo}
                >
                    Submit
                </button>
            </div>
            <ul id="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="list-item">
                        <p className="text">{todo.text}</p>
                        <i
                            className='fas fa-edit'
                            onClick={() => upTodo(todo.id)}
                        ></i>
                        <i
                            className='fas fa-trash'
                            onClick={() => delTodo(todo.id)}
                        ></i>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todo