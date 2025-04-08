

 const closeCardBtn = document.getElementById("closeCard");
const openCardBtn = document.getElementById("openCard");
 const overlay = document.getElementById("overlay");
 const agora = new Date().toISOString();


 openCardBtn.addEventListener("click", () => {
     overlay.style.display = "flex";
 });


 closeCardBtn.addEventListener("click", () => {
     overlay.style.display = "none";
 });
 
 function toggleNav() {
    const nav = document.getElementById("nav");
    nav.classList.toggle("show");
}



 document.getElementById("saveTask").addEventListener("click", () => {
     const titulo = document.getElementById("taskTitle").value;
     const descricao = document.getElementById("taskDescription").value;

     if (titulo.trim() === "" || descricao.trim() === "") {
         alert("Preencha todos os campos!");
         return;
     }

     console.log("Nova tarefa:", { titulo, descricao });
     enviarParaAPI(titulo, descricao);
     overlay.style.display = "none";
 });

 async function enviarParaAPI(titulo, descricao) {
     try {
         const response = await fetch("http://localhost:8081/tarefas", { 
             method: "POST",  
             headers: {
                 "Content-Type": "application/json" 
             },
             body: JSON.stringify({ 
                 titulo: titulo,
                 descricao: descricao,
                 ativo: true, 
                 creationTimestamp: new Date().toISOString(), 
                 updateTimestamp: new Date().toISOString() 
                 
             })
         });


         if (!response.ok) {
             throw new Error(`Erro ao enviar tarefa: ${response.statusText}`);
         }

         await fetchTarefas();
         const data = await response.json();
         console.log("Resposta da API:", data);
         alert("Tarefa adicionada com sucesso!");
        

     } catch (error) {
         console.error("Erro na requisição:", error);
         alert("Erro ao adicionar tarefa. Tente novamente.");
     }
 }
 async function alterarStatus(id) {
        fetch(`http://localhost:8081/tarefas/${id}/status`, {
            method: "PUT",
        })
        location.reload();
     
 }

 const fetchTarefas = async () => {
    try {
        const response = await fetch('http://localhost:8081/tarefas');

        if (!response.ok) {
            throw new Error(`Erro na resposta: ${response.status}`);
        }

        const tarefas = await response.json();

        const container = document.getElementById('task-container');
        container.innerHTML = '';

        tarefas.forEach(tarefa => {
            const taskCard = document.createElement('div');
            taskCard.classList.add('card');

            taskCard.innerHTML = `
                <input type="checkbox" class="delete-checkbox" data-id="${tarefa.id}" style="display: none;">
                <div class="card-details" onclick="entrarModoEdicao(${tarefa.id}, '${tarefa.titulo}', '${tarefa.descricao}', ${tarefa.ativo}, '${tarefa.creationTimestamp}')">
                    <p class="text-title">${tarefa.titulo}</p>
                    <p class="text-body">${tarefa.descricao}</p>
                </div>
                <button onclick="alterarStatus(${tarefa.id})" class="card-button">${tarefa.ativo ? 'Feito' : 'Pendente'}</button>
            `;

            container.appendChild(taskCard);
        });

    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        alert("⚠️ Falha ao conectar com o backend. Verifique se o servidor está online.");
    }
};


 function entrarModoEdicao(id, titulo, descricao, ativo) {
    const card = event.currentTarget.parentElement;

    card.innerHTML = `
        <input type="text" id="edit-titulo-${id}" value="${titulo}" />
        <input type="text" id="edit-descricao-${id}" value="${descricao}" />
        <label>
            Ativo: <input type="checkbox" id="edit-ativo-${id}" ${ativo ? 'checked' : ''} />
        </label>
        <button onclick="salvarEdicao(${id})">Salvar</button>
        <button onclick="fetchTarefas()">Cancelar</button>
    `;
}
function salvarEdicao(id) {
    const titulo = document.getElementById(`edit-titulo-${id}`).value;
    const descricao = document.getElementById(`edit-descricao-${id}`).value;
    const ativo = document.getElementById(`edit-ativo-${id}`).checked;

    const tarefaAtualizada = {
        titulo,
        descricao,
        ativo,
       
        updateTimestamp: agora
    };

    fetch(`http://localhost:8081/tarefas/${id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tarefaAtualizada)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao editar a tarefa");
        }
        return response.json();
    })
    .then(() => {
        alert("Tarefa atualizada com sucesso!");
        fetchTarefas();
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao editar a tarefa.");
    });
}


 window.onload = fetchTarefas;

 const deleteModeBtn = document.getElementById('delete-mode-btn');
 let deleteMode = false;


 deleteModeBtn.addEventListener('click', async () => {
     if (deleteMode) {
         
         const selectedTasks = document.querySelectorAll('.delete-checkbox:checked');
         const deletePromises = Array.from(selectedTasks).map(async (checkbox) => {
             const taskId = checkbox.dataset.id; 

             try {
                 const response = await fetch(`http://localhost:8081/tarefas/${taskId}`, {
                     method: 'DELETE'
                 });

                 if (response.ok) {
                     checkbox.parentElement.remove(); 
                 } else {
                     console.error(`Erro ao excluir tarefa ID ${taskId}`);
                 }
             } catch (error) {
                 console.error(`Erro na requisição: ${error}`);
             }
         });

         await Promise.all(deletePromises); 
         deleteMode = false;
         deleteModeBtn.textContent = 'Excluir';
         document.querySelectorAll('.delete-checkbox').forEach(checkbox => checkbox.style.display = 'none');
     } else {
        
         deleteMode = true;
         const checkboxes = document.querySelectorAll('.delete-checkbox');

         checkboxes.forEach(checkbox => {
             checkbox.style.display = 'block';
         });

         deleteModeBtn.textContent = 'Confirmar Exclusão';
     }
 });