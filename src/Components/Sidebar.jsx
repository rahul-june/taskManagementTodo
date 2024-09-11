import React, { useEffect, useState } from 'react';
import { Home, MessageCircle, CheckSquare, Users, Settings, Menu, X, Plus } from 'lucide-react';
import { Popover, TextField, Button } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';  // Import the Lightbulb icon
import { addTodo,fetchtodo} from '../Redux/Actions/tasks_todo1';  // Ensure correct import


const styles = {
  sidebar: (isOpen) => ({
    display: 'flex',
    flexDirection: 'column',
    width: isOpen ? '280px' : '60px',
    height: '100vh',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    transition: 'width 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  }),
  link: {
    display: 'flex',
    alignItems: 'center',
    color: '#212529',
    textDecoration: 'none',
    padding: '8px 0',
    whiteSpace: 'nowrap',
  },
  icon: {
    marginRight: '8px',
    minWidth: '24px',
  },
  hr: {
    margin: '16px 0',
    border: 'none',
    borderTop: '3px solid #DBDBDB',
  },
  projectHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#6c757d',
    marginTop: '16px',
    marginBottom: '8px',
    whiteSpace: 'nowrap',
  },
  projectsSection: {
    flexGrow: 1,
    overflowY: 'auto',
    marginBottom: '16px',
  },
  thoughtsCard: (isOpen) => ({
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    display: isOpen ? 'block' : 'none',
  }),
  button: {
    width: '100%',
    padding: '5px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  toggleButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  popoverContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
};

const Sidebar = ({ addTodo ,fetchtodo,setProjectNamefun}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [projectNames,setProjectNames]=useState([]);
  const [todo, setTodo] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todo.trim() !== '') {
      addTodo(todo);
      setTodo('');
      handleClose();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'add-project-popover' : undefined;

  useEffect(()=>{

  setProjectNames(Object.keys(fetchtodo().payload))

  },[todo])
  const randomcolour=()=>{
    const colour=['red','purple','blue','green','orange','black']   
    return colour[Math.floor(Math.random()*colour.length)]

  }
  return (
    <div style={styles.sidebar(isOpen)}>
      <button onClick={toggleSidebar} style={styles.toggleButton} className='mt-2'>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <a href="/" style={{...styles.link, fontSize: '18px', fontWeight: 'bold', marginBottom: '16px'}}>
        {isOpen ? 'Project M.' : ''}
      </a>
      <hr style={styles.hr} />
      <nav>
        
        <a href="#" style={styles.link}><Home style={styles.icon} /> {isOpen && 'Home'}</a>
        <a href="#" style={styles.link}><MessageCircle style={styles.icon} /> {isOpen && 'Messages'}</a>
        <a href="#" style={styles.link}><CheckSquare style={styles.icon} /> {isOpen && 'Tasks'}</a>
        <a href="#" style={styles.link}><Users style={styles.icon} /> {isOpen && 'Members'}</a>
        <a href="#" style={styles.link}><Settings style={styles.icon} /> {isOpen && 'Settings'}</a>
      </nav>
      <hr style={styles.hr} />
      {isOpen && (
        <div style={styles.projectHeading}>
          <span>MY PROJECTS</span>
          <Plus size={16} style={{cursor: 'pointer'}} onClick={handleAddClick} />
        </div>
      )}
      {isOpen?<>
        <div style={styles.projectsSection}>
        <nav>
          {
            projectNames.map((item)=>(
              <a href="#" onClick={()=>{setProjectNamefun(item)}} style={styles.link}><span style={{color: randomcolour(), marginRight: '8px'}}>●</span> {isOpen && item}</a>
            ))
          }
         
        </nav>
      </div>
      </>:""}
      
      {/* <LightbulbIcon sx={{color:'yellow'}} /> */}
      {/* <div style={styles.thoughtsCard(isOpen)}>
        
        <p style={{fontSize: '14px', color: '#6c757d', marginBottom: '16px',textAlign:'center'}}>
          We don't have any notice for you, till then you can share your thoughts with your peers.
        </p>
        <button style={styles.button}>Write a message</button>
      </div> */}
           {isOpen ? <>
            <div className=" card position-relative  p-2 border-1" style={{borderRadius:"15px"}}>
        <div className='position-absolute top-0 start-50 translate-middle' style={{ background: "white", borderRadius: "50%", }}>

          <LightbulbIcon sx={{color:"yellow"}}/>
        </div>
        <div className='card-body'>
        <h6 style={{marginBottom: '8px',textAlign:'center'}}>Thoughts Time</h6>
        <p style={{fontSize: '14px', color: '#6c757d', marginBottom: '16px',textAlign:'center'}}>
          We don't have any notice for you, till then you can share your thoughts with your peers.
        </p>
        <button style={styles.button}>Write a message</button>
        </div>
      </div>
             
           </> : ''}
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <form onSubmit={handleSubmit} style={styles.popoverContent}>
          <TextField
            label="Project Name"
            variant="outlined"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="secondary">
            Add Project
          </Button>
        </form>
      </Popover>
    </div>
  );
};

// Redux connection
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch(addTodo(todo)),
  fetchtodo: () => dispatch(fetchtodo()),
});

export default connect(null, mapDispatchToProps)(Sidebar);
