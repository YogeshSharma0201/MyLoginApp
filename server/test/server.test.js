const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
const {User} = require('./../models/user');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', ()=> {
  it('should create a new todo', (done)=>{
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err, res)=>{
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=> done(e));
      });
  });

  it('should not create todo with invalid body data', (done)=>{

    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, res)=>{
        if(err){
          return done(err);
        }

        Todo.find().then((todos)=>{
            expect(todos.length).toBe(2);
            done();
        }, (e)=> {
            done(e);
        }).catch((e)=> done(e));
      });
  });

});

describe('GET /todos', ()=> {
  it('should get all todos', (done)=>{
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /todos/:id', ()=>{
  it('should return todo doc', (done)=>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done)=>{
     request(app)
      .get(`/todos/${(new ObjectID).toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done)=>{
    request(app)
      .get(`/todos/${123}`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', ()=>{
  it('should update the todo', (done)=>{
    //grad id of first item
    //update text, set completed true
    //200
    //text is changed, completed is true, compledtedAt is a number .toBeA
    var text = 'Updated todo';
    var completed = true;

    request(app)
      .patch(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .send({text,completed})
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(completed);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        Todo.findById(todos[0]._id).then((doc)=>{
          expect(doc.text).toBe(text);
          expect(doc.completed).toBe(completed);
          expect(doc.completedAt).toBeA('number');
          done();
        }).catch((e)=>{
          done(e);
        });
      });


  });

  it('should clear completedAt when todo is not completed', (done)=>{
    //grab id of second todo item
    // update text, set completed to false
    //200
    //text is changed, completed false, completedAt is null .toNotExist
    var completed = false;

    request(app)
      .patch(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .send({completed})
      .expect((res)=>{
        expect(res.body.todo.completed).toBe(completed);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        Todo.findById(todos[0]._id).then((doc)=>{
          expect(doc.completed).toBe(completed);
          expect(doc.completedAt).toNotExist();
          done();
        }).catch((e)=>{
          done(e);
        });
      });

  });
});

describe('GET /users/me', ()=>{
  it('should return user if authenticated', (done)=>{
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done)=>{
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res)=>{
        expect(res.body).toEqual({});
      })
      .end(done);
  });

});

describe('POST /users', ()=>{
  it('should create a user', (done)=> {
    var email = 'example@example.com';
    var password = '123abc';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res)=>{
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err)=>{
        if(err){
          return done(err);
        }

        User.findOne({email}).then((user)=>{
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        });
      });
  });

})
