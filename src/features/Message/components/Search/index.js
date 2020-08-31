import React from "react";
import { Button, makeStyles, Modal, Container } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { Formik, Form, FastField } from "formik";
import InputField from "custom-fields/InputField";

const useStyles = makeStyles({
  root: {
    marginBottom: "30px",
  },
  searchButton: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    height: "50px",
    backgroundColor: "transparent",
    borderRadius: "10px",
  },
  searchForm: {
    position: "absolute",
    left: "50%",
    top: "10%",
    transform: "translateX(-50%)",
    width: "50%",
    height: "100px",
    backgroundColor: "white",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    "&:focus": {
      outline: "0",
    },
  },
});

function Search(props) {
  const classes = useStyles();

  const [showSearch, setShowSearch] = useState(false);

  const handleOpenSearchForm = () => {
    setShowSearch(true);
  };

  const handleCloseSearchForm = () => {
    setShowSearch(false);
  };

  const initialValues = {
    query: "",
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.searchButton}
        variant="contained"
        color="secondary"
        startIcon={<SearchIcon />}
        onClick={handleOpenSearchForm}
      >
        Search
      </Button>

      <Modal open={showSearch} onClose={handleCloseSearchForm}>
        <Container className={classes.searchForm}>
          <Formik initialValues={initialValues}>
            {(formikProps) => {
              const { values } = formikProps;

              return (
                <Form>
                  <FastField
                    name="query"
                    component={InputField}
                    placeholder="Search"
                    value={values.query}
                    margin="normal"
                    autoFocus={true}
                  />
                </Form>
              );
            }}
          </Formik>
        </Container>
      </Modal>
    </div>
  );
}

export default Search;
