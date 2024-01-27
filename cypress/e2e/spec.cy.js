/// <reference types="cypress" />
// import { addTodo, deleteTodo } from '../../src/actions'

describe('Redux store', () => {
  it('loads', () => {
    cy.visit('/index.html')
    cy
    .get('james-todo-app')
    .shadow()
    .find('input')
    .should('have.class', 'new-todo')
    .and('have.focus')
    .and('have.attr', 'placeholder', 'What needs to be done?');

    cy
    .get('james-todo-app').shadow().find('.todo-list .todo-item').should('have.length', 2);
  })

  it('has expected state on load', () => {
    cy.visit('/')
    cy.window().its('store').invoke('getState').should('deep.equal', {
      todos: [
        { id: 1, text: 'Example Todo 1', completed: false },
        { id: 2, text: 'Example Todo 2', completed: true },
      ]
    })
  })

  it('is updated by the DOM actions', () => {
    cy.visit('/')
    cy
    .get('james-todo-app')
    .shadow()
    .find('input').type('Example Todo 3');
    cy
    .get('james-todo-app')
    .shadow().find('[data-cy="add"]').click();
    cy.window().its('store').invoke('getState').should('deep.equal', {
      todos: [
        { id: 1, text: 'Example Todo 1', completed: false },
        { id: 2, text: 'Example Todo 2', completed: true },
        { id: 3, text: 'Example Todo 3', completed: false },
      ]
    })
  })

  it('can wait for delayed updates using pipe', () => {
    cy.visit('/')
    cy
    .get('james-todo-app')
    .shadow()
    .find('input').type('Example Todo 3{enter}');
    const getTodos = (win) => {
      return win.store.getState().todos
    }

    // using cypress-pipe the "getTodos" will be retried until
    //   should('have.length', 3) passes
    //    or
    //   default command timeout ends
    cy.window().pipe(getTodos).should('have.length', 3)
  })

  // it('can drive app by dispatching actions', () => {
  //   cy.visit('/')
  //   // dispatch Redux action
  //   cy
  //   .window()
  //   .its('store')
  //   .invoke('dispatch', { type: 'ADD_TODO', text: 'Test dispatch' })

  //   // check if the app has updated its UI
  //   cy.get('.todo-list li').should('have.length', 2).contains('Test dispatch')
  // })

  // const dispatch = (action) => cy.window().its('store').invoke('dispatch', action)

  // it('can use actions from application code', () => {
  //   cy.visit('/')
  //   dispatch(addTodo('Share code'))
  //   dispatch(deleteTodo(0))
  //   cy.get('.todo-list li').should('have.length', 1).contains('Share code')
  // })

  // it('can set initial todos', () => {
  //   cy.visit('/', {
  //     onBeforeLoad: (win) => {
  //       win.initialState = [
  //         {
  //           id: 0,
  //           text: 'first',
  //           completed: true,
  //         },
  //         {
  //           id: 1,
  //           text: 'second',
  //           completed: false,
  //         },
  //         {
  //           id: 2,
  //           text: 'third',
  //           completed: true,
  //         },
  //       ]
  //     },
  //   })

  //   // there should be 3 items in the UI
  //   cy.get('.todo-list li').should('have.length', 3)
  //   // and 2 of them should be completed
  //   cy.get('.todo-list li.completed').should('have.length', 2)
  // })

  // const initialVisit = (url, fixture) => {
  //   cy.fixture(fixture).then((todos) => {
  //     cy.visit(url, {
  //       onBeforeLoad: (win) => {
  //         win.initialState = todos
  //       },
  //     })
  //   })
  // }

  // it('can set initial todos from a fixture', () => {
  //   initialVisit('/', '3-todos.json')
  //   // there should be 3 items in the UI
  //   cy.get('.todo-list li').should('have.length', 3)
  //   // and 2 of them should be completed
  //   cy.get('.todo-list li.completed').should('have.length', 2)
  // })

  // it('snapshots', () => {
  //   cy.visit('/')
  //   cy.focused().type('first{enter}').type('second{enter}').type('third{enter}')
  //   cy.contains('.todo-list li', 'second').find('input[type=checkbox]').click()
  //   cy.contains('.filters a', 'Completed').click()
  //   cy.window().its('store').invoke('getState').toMatchSnapshot()
  // })
})