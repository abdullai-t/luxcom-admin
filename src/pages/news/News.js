import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import RefreshIcon from "@material-ui/icons/Refresh";
import Button from "@material-ui/core/Button";
import { Table, FormControl } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { deleteANews,deleteTable } from "../../machinery/functions/IneractionFunctions";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import ConfirmationModal from "../../reusables/ConfirmationModal";
import NewsForm from "./NewsForm";
import Avatar from "@material-ui/core/Avatar";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddNews: false,
      news: [],
      toEdit: {},
      editMode: false,
      query: "",
      confirm:false,
      table:"",
      filtered:[]
    };
  }
  componentWillReceiveProps({ news }) {
    this.setState({ news: news });
  }
  componentDidMount() {
    let news = this.props.news;
    this.setState({ news: news });
  }
  handleShow = () => {
    this.setState({ showAddNews: false });
  };

  deleteNews = async (item) => {
    let { news } = this.state;
    let res = await deleteANews(
      this.props.token,
      item.id
    );
    if (res && res.success) {
      let filtered = news.filter((x) => x.id !== item.id);
      this.setState({ news: filtered }, ()=>this.props.saveDashboardData());
      
    }
  };

  editNews = (item) => {
    this.setState({ toEdit: item, showAddNews: true, editMode: true });
  };

  searchInputListener = (e) => {
    const content = e.target.value.toLowerCase();
    const filtered = this.state.news.filter((item) => {
      const arr = item.title.toLowerCase().split(content);
      if (arr.length > 1) return item;
      return null;
    });
    this.setState({ filtered });
  };

  deleteAll = async()=>{
   let del = await deleteTable(this.props.token, "NEWS")
   if (del){
    this.props.saveDashboardData()
    this.setState({confirm:false})
   }

  }

  truncate=(str, no_words)=> {
    return str.split(" ").splice(0,no_words).join(" ");
}

  render() {
    const { news, filtered } = this.state;
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>NEWS</h3>
          <div onClick={this.props.saveDashboardData}>
            <RefreshIcon style={{ color: "grey" }} />
          </div>
        </div>
        <Divider />
        <div className="space-me" id="interactions-container">
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.setState({ showAddNews: true, toEdit: "" })
              }
            >
              Add News Item
            </Button>
            <Button
              style={{ marginLeft: "1.5rem" }}
              variant="contained"
              color="secondary"
              onClick={()=>this.setState({confirm:true})}
            >
              DELETE TABLE
            </Button>
          </div>
          <div className="side-ways">
            <span id="search-name">Search:</span>
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => {
                this.setState({ query: e.target.value });
                this.searchInputListener(e);
              }}
            />
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Tiltle</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length || this.state.query
              ? filtered.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                     <td> <Avatar alt={item.image} src={item.image} /></td>
                      <td>{item.title}</td>
                      <td>{this.truncate(item.content, 30)}...</td>
                      <td style={{ display: "flex" }}>
                        <div
                          id="action"
                          className="center-me edit"
                          onClick={() => this.editNews(item)}
                        >
                          <EditIcon id="action-icon" />
                        </div>
                        <div
                          id="action"
                          className="center-me delete"
                          onClick={() => this.deleteNews(item)}
                        >
                          <DeleteIcon id="action-icon" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : news && news.length
              ? news.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td> <Avatar alt={item.image} src={item.image} /></td>
                      <td>{item.title}</td>
                      <td>{this.truncate(item.content, 30)}...</td>
                      <td style={{ display: "flex" }}>
                        <div
                          id="action"
                          className="center-me edit"
                          onClick={() => this.editNews(item)}
                        >
                          <EditIcon id="action-icon" />
                        </div>
                        <div
                          id="action"
                          className="center-me delete"
                          onClick={() => this.deleteNews(item)}
                        >
                          <DeleteIcon id="action-icon" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
        {this.state.editMode || this.state.showAddNews ? (
          <NewsForm
            show={this.state.showAddNews}
            toEdit={this.state.toEdit}
            editMode={this.state.editMode}
            handleShow={this.handleShow}
            onHide={() => this.setState({ showAddNews: false })}
          />
        ) : null}
        {this.state.confirm ? (
          <ConfirmationModal
            show={this.state.confirm}
            delete={() => this.deleteAll()}
            toEdit={this.state.toEdit}
            handleShow={this.handleShow}
            onHide={() => this.setState({ confirm: false })}
          />
        ) : null}
      </Paper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    news: state.dashboard.news,
    token: state.user.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      saveDashboardData: getDashboardDataAction,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(News);
