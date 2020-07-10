import React from 'react';
import { Grid, Message, Label, Icon, Loader, Menu, Input } from 'semantic-ui-react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
       super(props);
        this.state = { 
            responseMessage : "", 
            progressing: false, 
            isEmployee: false,
            dept_no : "",
            dept_name : "",
            old_no: "",
            old_name: ""
       };
   }

  async getData (url){
    const response = await axios.get(url);
    console.log("async getData(url)");
    console.log("url = " + url);
    console.log(response.data.data);
    this.setState ({
        responseMessage: response.data.data,
        progressing: false
    });
  }

  deptClicked() {
      const backend = "http://localhost:3001/api/getDept";  
      console.log("on deptClicked");
      this.setState ({
          progressing: true,
          responseMessage: "",
          isDepartment: true
       });
      this.getData(backend);
   }

   addDeptClicked() {
      const backend = "http://localhost:3001/api/addDept";

      console.log("on addDeptClicked");
      const {dept_no, dept_name} = this.state;
      if (dept_no === undefined || dept_no === "" || dept_name === undefined || dept_name === "") {
           console.log ("please enter dept_no and dept_name");
           return;
      }
      console.log(dept_no);
      console.log(dept_name);
      this.setState ({
          progressing: true,
          responseMessage: "",
          isDepartment: false
      });
      this.postData(backend, {dept_no: dept_no, dept_name: dept_name});
    }

    async postData (url, data){
      try {
            const response = await axios.post(
              url,
              { data: data}
            );
            console.log("postData()");
            console.log("url = " + url);
            console.log(response.status);
            console.log(response.data.success);
            this.setState ({
                progressing: false,
                dept_no : "",
                dept_name : ""
            });
    } catch (error) {
            console.log(`Axios post failed: ${error}`);
            this.setState ({
                 progressing: false,
                 dept_no : "",
                 dept_name : ""
            });
       }
    }

    deleteDeptClicked() {
      const backend = "http://localhost:3001/api/deleteDept";
      const {dept_no, dept_name} = this.state;
      if (dept_no === undefined || dept_no === "" )
          return;
      console.log("on deleteDeptClicked");
      console.log(dept_no);
      console.log(dept_name);
      this.setState ({
          progressing: true,
          responseMessage: "",
          isDepartment: false
      });
      this.deleteData(backend, {dept_no: dept_no, dept_name: dept_name});
    }

    updateDeptClicked() {
      const backend = "http://localhost:3001/api/updateDept";
      const {dept_no, dept_name, old_no, old_name} = this.state;
      if  (dept_no   === undefined || dept_no === "" ||
           dept_name === undefined || dept_name === ""  ||
           old_no   === undefined || old_no === "" ||
           old_name === undefined || old_name === ""  )  
           return;
      console.log("on updateDeptClicked");
      console.log(old_no);
      console.log(old_name);
      console.log(dept_no);
      console.log(dept_name);
      this.setState ({
          progressing: true,
          responseMessage: "",
          isDepartment: false
      });
      this.putData(backend, {old_no: old_no, old_name: old_name, dept_no: dept_no, dept_name: dept_name});
    }

    async putData (url, data){
      try {
            const response = await axios.put(
              url,
              { data: data}
            );
            console.log("putData()");
            console.log("url = " + url);
            console.log(response.status);
            console.log(response.data.success);
            this.setState ({
                progressing: false
            });
    } catch (error) {
            console.log(`Axios post failed: ${error}`);
            this.setState ({
                 progressing: false
            });
       }
    }

    async deleteData (url, data){
      try {
            const response = await axios.delete(
              url,
              { data: data}
            );
            console.log("deleteData()");
            console.log("url = " + url);
            console.log(response.status);
            console.log(response.data.success);
            this.setState ({
                progressing: false
            });
    } catch (error) {
            console.log(`Axios delete failed: ${error}`);
            this.setState ({
                 progressing: false
            });
       }
    }   

   
  displayRows = rows =>
      rows.length > 0 &&
      rows.map(row => {
          const {isDepartment} = this.state;

          if (isDepartment) {
              const {_id, dept_no, dept_name} = row;
              const item = "id : " + _id  + " ,  dept_no : " + dept_no + " ,  dept_name : " + dept_name;; 
              return ( <Menu.Item key={_id} >
                           {item}
                       </Menu.Item>)
            }
      });

  
   render() {  
      const { responseMessage, progressing } = this.state;

      return (
        <Grid style={styles.container}>
            
            <Grid.Row style={styles.menucontainer}>
                <Message style={styles.userheader}>
                     <p> MongoDB Full Stack Demo </p>
                </Message> 
            </Grid.Row> 
            <Grid.Row style={styles.menucontainer}>  
                 <Grid.Column style={styles.testColumn}>  
                    <Label style={styles.menulabel}> Fetch Department List </Label>
                     <Icon name="play circle outline" color="green" size="huge" disabled={progressing} style={{position: "relative", left: "38%", marginTop: "10px"}} onClick={()=>this.deptClicked()}> </Icon>                  
                   </Grid.Column>
           
                <Grid.Column style={styles.testColumn}>  
                     <Label style={styles.menulabel}> Add Department </Label>
                     <Input type="text" placeholder="Department No." style={{width:"100%", marginTop: "15px"}} 
                           onChange={(e, { value }) => this.setState ({dept_no: value})} />
                     <Input type="text" placeholder="Department Name" style={{width:"100%", marginTop: "5px"}} 
                           onChange={(e, { value }) => this.setState({dept_name: value})} />
                     <Icon name="play circle outline" color="green" size="huge" 
                           disabled={progressing} style={{position: "relative", left: "38%", marginTop: "10px"}} 
                           onClick={()=>this.addDeptClicked()}> </Icon>                  
                </Grid.Column>

                <Grid.Column style={styles.testColumn}>  
                     <Label style={styles.menulabel}> Delete Department </Label>
                     <Input type="text" placeholder="Department No." style={{width:"100%", marginTop: "15px"}} 
                           onChange={(e, { value }) => this.setState ({dept_no: value})} />
                     <Input type="text" placeholder="Department Name" style={{width:"100%", marginTop: "5px"}} 
                           onChange={(e, { value }) => this.setState({dept_name: value})} />
                     <Icon name="play circle outline" color="green" size="huge" 
                           disabled={progressing} style={{position: "relative", left: "38%", marginTop: "10px"}} 
                           onClick={()=>this.deleteDeptClicked()}> </Icon>                  
                </Grid.Column>

                <Grid.Column style={styles.testColumn}>  
                     <Label style={styles.menulabel}> Update Department </Label>

                     <Input type="text" placeholder="Old Department No." style={{width:"100%", marginTop: "15px"}} 
                           onChange={(e, { value }) => this.setState ({old_no: value})} />
                     <Input type="text" placeholder="Old Department Name" style={{width:"100%", marginTop: "5px"}} 
                           onChange={(e, { value }) => this.setState({old_name: value})} />

                           
                     <Input type="text" placeholder="Department No." style={{width:"100%", marginTop: "15px"}} 
                           onChange={(e, { value }) => this.setState ({dept_no: value})} />
                     <Input type="text" placeholder="Department Name" style={{width:"100%", marginTop: "5px"}} 
                           onChange={(e, { value }) => this.setState({dept_name: value})} />


                     <Icon name="play circle outline" color="green" size="huge" 
                           disabled={progressing} style={{position: "relative", left: "38%", marginTop: "10px"}} 
                           onClick={()=>this.updateDeptClicked()}> </Icon>                  
                </Grid.Column>

            </Grid.Row> 
            <Grid.Row style={{width: "100%", marginTop: "10px"}}>
                 <Grid.Column style={{width: "10%", marginLeft: "10px"}}>               
                      <Loader active={progressing} size="large"/> 
                 </Grid.Column>   
                 <Grid.Column style={{width: "90%", marginLeft: "10px"}}>               
                      {responseMessage && <Menu vertical style={styles.responsePrompt}> {this.displayRows(responseMessage)} </Menu>} 
                 </Grid.Column>              
            </Grid.Row> 
        </Grid>
      );
   }
}
export default App;

const styles = {
   container: {
      padding: "2px",
      margin:  "2px",
      width:   "100%",
   },
   userheader: {
    padding:    "20px",
    margin:     "20px",
    width:      "100%",
    fontWeight: "bold",
    fontSize:   "large"
   },
   responsePrompt: {
    padding:    "5px",
    margin:     "5px",
    width:      "100%",
    fontWeight: "normal",
    fontSize:   "medium", 
    backgroundColor: "white",
    color: "green", 
    overflow: "scroll"
   },
   menuContainer: {
    padding:    "4px",
    margin:     "4px",
    width:      "100%",
    border:     "1px solid black"
   },
   menulabel: {
    padding: "3px",
    margin:  "4px",
    width:   "95%",
    fontWeight: "bold",
    fontSize:   "large",
    backgroundColor: "white",
    textAlign: "center"
   },
   testColumn: {
    padding:    "10px",
    marginLeft:     "10px",
    marginRight:  "10px",
    marginTop: "20px", 
    width:      "22%",
    border:     "1px dotted black"
   },
 };
