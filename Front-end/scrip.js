 // Elementos

 const closeCardBtn = document.getElementById("closeCard");
const openCardBtn = document.getElementById("openCard");
 const overlay = document.getElementById("overlay");

 // Abrir o card
 openCardBtn.addEventListener("click", () => {
     overlay.style.display = "flex";
 });

 // Fechar o card
 closeCardBtn.addEventListener("click", () => {
     overlay.style.display = "none";
 });


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
     const response = await fetch('http://localhost:8081/tarefas');
     const tarefas = await response.json();

    
     const container = document.getElementById('task-container');
     container.innerHTML = ''; 

     tarefas.forEach(tarefa => {
        
         const taskCard = document.createElement('div');
         taskCard.classList.add('card');

         taskCard.innerHTML = `
             <input type="checkbox" class="delete-checkbox" data-id="${tarefa.id}" style="display: none;">
             <div class="card-details">
                 <p class="text-title">${tarefa.titulo}</p>
                 <p class="text-body">${tarefa.descricao}</p>
             </div>
             <button onclick="alterarStatus(${tarefa.id})" class="card-button">${tarefa.ativo ? 'Feito' : 'Pendente'}</button>
         `;

         container.appendChild(taskCard);
     });
 };


 window.onload = fetchTarefas;

 const deleteModeBtn = document.getElementById('delete-mode-btn');
 let deleteMode = false;


 deleteModeBtn.addEventListener('click', async () => {
     if (deleteMode) {
         // Confirma a exclusão das tarefas
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

         await Promise.all(deletePromises); // Aguarda todas as exclusões
         deleteMode = false;
         deleteModeBtn.textContent = 'Excluir';
         document.querySelectorAll('.delete-checkbox').forEach(checkbox => checkbox.style.display = 'none');
     } else {
         // Alterna o modo de exclusão
         deleteMode = true;
         const checkboxes = document.querySelectorAll('.delete-checkbox');

         checkboxes.forEach(checkbox => {
             checkbox.style.display = 'block'; // Mostra os checkboxes
         });

         deleteModeBtn.textContent = 'Confirmar Exclusão'; // Muda o texto do botão para "Confirmar Exclusão"
     }
 });