$(document).ready(function() {
    const URL = 'http://localhost/gerenciador-tarefas/src';


    // RECEBER AS TAREFAS PENDENTES
    $('#tarefasGet').on('click', function() {
        $.ajax({
            url: URL+'/tarefas',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // Limpa o container antes de adicionar as novas tarefas
                $('#ContainerTarefas').empty();
                $('#titulo-secao').empty();

                if(!$('#text-pendente').length){
                        $('#titulo-secao').append(
                    '<h1 id="text-pendente" class="text-white bordbottom">Tarefas pendentes</h1>'
                )};
                $.each(data, function(index, tarefa) {
                    $('#ContainerTarefas').append(
                        '<div class="col-sm-6 mb-3 mb-sm-0">' +
                        '<div class="card shadow rounded-4 border-0 p-2 mt-4">' + // Adiciona espaçamento no topo com mt-4
                        '<div class="card-body ">' +
                        '<h5 class="card-title text-primary fw-bold">' + tarefa.titulo + '</h5>' +
                        '<hr class="my-2"></hr>' +
                        '<p class="card-text mt-3">' + tarefa.descricao + '</p>' + 
                        '<p class="card-text">'+ 'Criada em: ' + tarefa.dataFormatada + '</p>' + 
                        '<button  class="btn btn-success m-2 btn-concluir" data-id="' + tarefa.id + '">Concluir</button>' +
                        '<button  class="btn btn-danger m-2 remover" data-id="' + tarefa.id + '">Deletar</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    );
               }); 
            },
              error: function(xhr, status, error) {
               // console.error('Erro ao atualizar a tarefa:', error);
                alert('Não foi possível concluir a tarefa.', xhr);
            }
        });
    });
    //RECEBER TAREFAS CONCLUIDAS
    $('#tarefasGetConcluidas').on('click', function() {
        $.ajax({
            url: URL+'/tarefas/concluidas',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
             $('#ContainerTarefas').empty();
            $('#titulo-secao').empty();

             if(!$('#text-pendente').length){
                      $('#titulo-secao').append(
                     '<h1 id="text-pendente" class="text-white bordbottom">Tarefas concluidas</h1>'
                )}
                $.each(data, function(index, tarefa) {
                    $('#ContainerTarefas').append(
                        '<div class="col-sm-6 mb-3 mb-sm-0 p-1">' +
                        '<div class="card shadow rounded-4 border-0  mt-3"">' +
                        '<div class="card-body bg-danger ">' +
                        '<h5 class="card-title text-white fw-bold">' + tarefa.titulo + '</h5>' +
                        '<hr class="my-2"></hr>' +
                        '<p class="card-text mt-3">' + tarefa.descricao + '</p>' + 
                        '<p class="card-text">'+ 'Concluida em: ' + tarefa.dataConclusao + '</p>' + 
                        '<button  class="btn btn-danger text-white m-2 remover " data-id="' + tarefa.id + '">Deletar</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                      
                    );
                    }); 
                  
            },
                error: function(xhr, status, error) {
            //    console.error('Erro ao atualizar a tarefa:', error);
                alert('Não foi possível concluir a tarefa.', xhr);
            }
        });
    });




     //CONCLUIR TAREFAS
     
    $('#ContainerTarefas').on('click', '.btn-concluir', function(event) {
        event.preventDefault();


        let idTarefa = $(this).data('id');
        let botaoClicado = $(this); 

        $.ajax({
            url: URL+ '/tarefas/'+ idTarefa +'/concluir',
            method: 'PUT',
            contentType: 'application/json', 
            data: {},
            success: function(resposta) {
             //   console.log('Tarefa atualizada com sucesso!', resposta);
               botaoClicado.closest('.col-sm-6').fadeOut(400, function() {
                           $(this).remove();
    });

            },
            error: function(xhr, status, error) {
              //  console.error('Erro ao atualizar a tarefa:', error);
                alert('Não foi possível concluir a tarefa.', xhr);
            }
        });
    }); 

// REMOVER AS TAREFAS
$('#ContainerTarefas').on('click', '.remover', function(event){
    event.preventDefault();

    let idTarefa = $(this).data('id');
        let botaoClicado = $(this); 
        $.ajax({
            url:URL + '/tarefas/'+ idTarefa,
            method: 'DELETE',
            success: function(resposta){
               // console.log('Tarefa deletada com sucesso',resposta);
                 botaoClicado.closest('.col-sm-6').fadeOut(400, function() {
                           $(this).remove();
                });
            },
            error: function(xhr,status,error){
                 //    console.error('Erro ao atualizar a tarefa:', error);
                alert('Não foi possível concluir a tarefa, ocorreu o erro', xhr);
            }
        });
    });
// ADICIONAR TAREFAS.

$('#formTarefa').on('submit', function(evento){
    evento.preventDefault();

    let titulo = $('#titulo').val();
    let descricao = $('#descricao').val();

    let jsonTarefa = {
            titulo: titulo,
        descricao: descricao
    }

    if(!titulo.trim()){
        alert('Por favor, digite o titulo.')
        return;
    }
    
       $('#ContainerTarefas').empty();
    if(!$('#text-pendente').length){
    $('#content').append(
    '<h1 id="text-pendente" class="text-white bordbottom">Tarefas pendentes</h1>')
    }
    $.ajax({
        url:URL + '/tarefas/adicionar',
        method: 'POST', 
        contentType: 'application/json',
        data: JSON.stringify(jsonTarefa),
        success: function(resposta){
           // console.log('Tarefa criada com sucesso', resposta);
        $('#formTarefa').trigger('reset');
             $('#tarefasGet').click();
            }, 
             error: function(xhr,status,error){
                //     console.error('Erro ao adicionar a tarefa:', error);
                alert('Não foi possível adicionar a tarefa, ocorreu o erro', xhr);
            }

    })
    


})

})