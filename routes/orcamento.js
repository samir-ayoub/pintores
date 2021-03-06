var express = require('express');
var router = express.Router();
require("../models/orcamento")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('orcamentos/salvar_orcamento', { 
  	tituloDaPagina: 'Orçamento', 
  	urlPost:"/orcamento/cadastrar", 
  	orcamento:new Orcamento() 
  });
});

router.post('/cadastrar', function(req, res, next) {
	var orcamento=new Orcamento();
	orcamento.nome=req.param("nome");
	orcamento.telefone=req.param("telefone");
	orcamento.endereco=req.param("endereco");
	orcamento.email=req.param("email");
	orcamento.orcamento=req.param("descricao");
	orcamento.incluir(function(rows,err){
		if(err){
			res.send("erro ao atualizar :"+err.message,500);
		}
		else{
			res.redirect("/orcamento/listar");
		}

	});
});

router.post('/update', function(req, res, next) {
	var orcamento=new Orcamento();
	orcamento.id=req.param("id");
	orcamento.nome=req.param("nome");
	orcamento.telefone=req.param("telefone");
	orcamento.endereco=req.param("endereco");
	orcamento.email=req.param("email");
	orcamento.orcamento=req.param("descricao");
	orcamento.alterar(function(rows,err){
		if(err){
			res.send("erro ao atualizar :"+err.message,500);
		}
		else{
			res.redirect("/orcamento/listar");
		}

	});
});

router.get('/listar', function(req,res,next){
	Orcamento.listar(function(rows,err){
		if(err){
			res.send("erro ao buscar :"+err.message,500);
		}
		else{
			res.render('orcamentos/listas_de_orcamentos',{registros:rows});
		}
	})
});

router.get('/excluir',function(req,res,next){
	Orcamento.excluirPorId(parseInt(req.param('id')),function(rows,err){
		if(err){
			res.send("erro ao excluir :"+err.message,500);
		}
		else{
			res.redirect("/orcamento/listar");
		}
	});
});

router.get('/alterar', function(req,res,next){
	Orcamento.buscaPorId(parseInt(req.param('id')),function(rows,err){
		if(err){
			res.send("erro ao buscar :"+err.message,500);
		}
		else{
			res.render('orcamentos/salvar_orcamento', { 
			  	tituloDaPagina: 'Orçamento', 
			  	urlPost:"/orcamento/update?id="+rows[0].id, 
			  	orcamento: rows[0]
			});
		}
	});
});


module.exports = router;

