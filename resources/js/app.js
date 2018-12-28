//var urlUsers = 'https://jsonplaceholder.typicode.com/users';
/*new Vue({
  el: '#main',
  created: function(){
    this.getUsers();
  },
  data: {
    lists: []
  },
  methods: {
    getUsers: function(){
      axios.get(urlUsers).then(response => {
        this.lists = response.data
      });
    }
  }
});*/

new Vue({
  el: '#crud',
  created: function(){
    this.getKeeps();
  },
  data: {
    keeps: [],
    pagination: {
      'total': 0,
      'current_page': 0,
      'per_page': 0,
      'last_page': 0,
      'from': 0,
      'to': 0,
    },
    newKeep: '',
    fillKeep: {'id': '', 'keep': ''},
    errors: [],
    offset: 3,
  },
  computed: {
    isActived: function(){
      return this.pagination.current_page;
    },
    pagesNumber: function(){
      //si no tenemos nada en la propiedad hasta entonces renornar nada
      if (!this.pagination.to) {
        return [];
      }
      var from = this.pagination.current_page - this.offset;
      //offset numero P/s variable(compensacion) mostrara la cant ant y desp del activo
      //si la resta anterio da numero negativo asignas a variable desde=1 
      //from=desde:que no se baje de la primer pagina(1)
      if (from < 1) {
        from = 1;
      }
      var to = from + (this.offset*2);
      //hasta:que no se pase de la ultima pagina
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      //calcular la numeracion exacta
      var pagesArray = [];
      while(from <= to){
        pagesArray.push(from);//mete el primervalor y + hasta llegar la variable hasta(to)
        from++;
      }
      return pagesArray;//cuando esta lleno
    }
  },
  methods: {
    getKeeps: function(page){
      //como parametro get al api agregar en ctrl Request en index
      var urlKeeps = 'tasks?page='+page;//sin paginacion var urlKeeps = 'tasks';
      axios.get(urlKeeps).then(response => {
        this.keeps = response.data.tasks.data,//this.keeps = response.data --- sin paginate
        this.pagination = response.data.pagination
      })
    },
    editKeep: function(keep){
      //llenamos la variable
      this.fillKeep.id = keep.id;
      this.fillKeep.keep = keep.keep;
      $('#edit').modal('show');//mostramos el formulario ya que tenemos los datos
    },
    updateKeep: function(id){
      var urlUpdate = 'tasks/' + id;
      //, this.fillKeep le pasamos los parametros relacionados con el registro
      axios.put(urlUpdate, this.fillKeep).then(response=>{
        this.getKeeps();
        this.fillKeep = {'id': '', 'keep': ''};
        this.errors = [];
        $('#edit').modal('hide');
        toastr.success('Tarea Actualizada con Exito');
      }).catch(error=>{
        this.errors = error.response.data
      });
    },
    deleteKeep: function(keep){
      var urlDelete = 'tasks/' + keep.id;
      axios.delete(urlDelete).then(response=>{//eliminamos
        this.getKeeps();//volvemos a recargar la lista
        toastr.success('Eliminado correctamente');//mensaje
      });
    },
    createKeep: function(){
      var urlCreate = 'tasks';
      axios.post(urlCreate, {
        keep: this.newKeep
      }).then(response=>{
        this.getKeeps();
        this.newKeep = '';
        this.errors = [];
        $('#create').modal('hide');
        toastr.success('Nueva Tarea Creada cn Exito');
      }).catch(error=>{
        this.errors = error.response.data
      });
    },
    changePage: function(page){
      this.pagination.current_page = page;
      this.getKeeps(page);
    }
  }
});