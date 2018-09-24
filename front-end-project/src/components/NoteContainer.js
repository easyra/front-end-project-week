import React, { Component } from "react";
import Notes from "./Notes/Notes";
import NavBar from "./NavBar/Navbar";
import styled from "react-emotion";
import NewNote from "./CreateNote/NewNote";
import NoteView from "./NoteViews/NoteView";
import { Route, Switch, Redirect } from "react-router-dom";

class NoteContainer extends Component {
  state = {
    notes: [
      {
        id: 1,
        title: "Note1",
        content: lorem
      },
      {
        id: 2,
        title: "Note2",
        content: lorem
      },
      {
        id: 3,
        title: "Note3",
        content: lorem
      },
      {
        id: 4,
        title: "Note4",
        content: lorem
      },
      {
        id: 5,
        title: "Note5",
        content: lorem
      },
      {
        id: 6,
        title: "Note6",
        content: lorem
      }
    ],
    selectedTheme: "standardTheme"
  };

  createNewNote = note => {
    this.setState(state => ({
      notes: [...this.state.notes, note]
    }));
  };
  updateNote = newNote => {
    console.log(newNote);
    const notes = this.state.notes.map( note => {
      if(note.id === newNote.id){
        console.log('hi');
        return newNote
      }else {
        return note
      }      
    })
    console.log(notes);
    this.setState({
      notes: notes
    })
  }

  render() {
    const { notes, selectedTheme } = this.state;

    return (
      <ContainerDiv data-theme={selectedTheme}>
        <Route
          strict
          path="/notes"
          render={props => <NavBar {...props} selectedTheme={selectedTheme} />}
        />

        <ContentContainer>
          {/*  */}
          <Switch>
            <Route
              exact
              path="/notes/create"
              render={props => (
                <NewNote
                  {...props}
                  selectedTheme={selectedTheme}
                  createNewNote={this.createNewNote}
                />
              )}
            />

            <Route
              exact
              path="/notes/:id"
              render={props => (
                <NoteView
                  {...props}
                  selectedTheme={selectedTheme}
                  updateNote={this.updateNote}
                  notes={notes}
                />
              )}
            />

            <Route
              exact
              path="/notes"
              render={props => (
                <Notes notes={notes} {...props} selectedTheme={selectedTheme} />
              )}
            />
            <Redirect to="/notes" />
          </Switch>
        </ContentContainer>
      </ContainerDiv>
    );
  }
}

const ContainerDiv = styled("div")`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  background: ${props => props.theme[props["data-theme"]].mainBackground};
  h1,
  h2 {
    color: ${props => props.theme[props["data-theme"]].mainTitle};
  }
`;

const ContentContainer = styled("div")`
  margin-top: 4%;
  margin-left: 20%;
`;

export default NoteContainer;

const lorem = `
nulla enim aute adipisicing esse in mollit nisi ea ea officia ea culpa qui consequat esse cillum sunt eu commodo velit tempor duis enim veniam irure
`