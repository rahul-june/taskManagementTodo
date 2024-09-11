import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Chip, AvatarGroup, Avatar, Box, IconButton, Stack, Button, Popover, TextField, TextareaAutosize, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShareIcon from '@mui/icons-material/Share';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Plus } from 'lucide-react';
import { addTodo, fetchtodo, addTaskTodo, updateTaskStatus } from '../Redux/Actions/tasks_todo1';


const styles = {
  popoverContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
};

const TaskCard = ({ task, onDragStart }) => {
  const { id, taskname, priority, description} = task;
  const avatars = ["data:image/jpeg;base64,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"," data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhERERAVFRAXFRUWFRcVFxAQEhYXFRUWFhUTFRYZHSggGB0nGxUVITEhJSk3Li4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLS0wLS0tLS4tLS0tLTAtLi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EAEEQAAIBAgMEBgcGBQMEAwAAAAECAAMRBBIhBQYxQVFhcYGRoRMiMkJSscEHI2Jy0fAUM5Ky4SSi0jR0gvEVQ1P/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUBAgMGB//EADgRAAICAgAFAQUGBAUFAAAAAAABAgMEEQUSITFBURNhcYGRBhQiMqGxMzTB0RUjQuHwFkNSYnL/2gAMAwEAAhEDEQA/ANk9UedEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAjYjG000ZhfoGp8BwnCzIrr/MzrXRZPsjT/APJA+yhPaQv6yLLiMPCZKjgS8syGOP8A+f8Au/xNf8RX/j+pt/h//sZDHLzBHn/mdI8QrffaOUsGxdtM306ytwIPz8JLhbCf5WRp1zh+ZGydDQQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAxdwoJJsALknQADnMNpLbCTb0jltp7faoStIlU+Lgzf8R5/KU+Rmyn0h0RbUYcY9Z9WV9HEgcNewM3yEgk0lLj7cXy/mR1HiVgEmhj2b2XR+wqT4AwCUuOHB1K+YjQN2RWF1Ph+9ITae0YaT7mdPGvT0cZh59x598n050o9J9V+pCuwoy6w6MsaNVXF1Nx+9D0S1hZGa3FlZOEoPUkbJuaiAIAgCAIAgCAIAgCAIAgCAIAgCAIBW7U2qtH1RrUPLkB0n9JDycpVdF1ZKx8Z29X2KtMU9U61CB1Gw7gJVTyLJPqyzhRXHsjfiqANMhnYrxILNbSaO2bWm+huq4p7S6nJpVUAnjrfKRaw5X58JzNzOnt5U40r9jf4jY0T8PvNQ95XXuDDyMcxnRvfEYKvxZA3Sb028dI2Y0FwzJ/JxSsvwuysPEfpAMqWKsbNZW6abK694vM7BaU8QGFmsR8Q9nv8AhgGti1FsynTyPUf1nWm6VUto5W1RsWpFzhMStRcy945g9Bl7VbG2PMiltqlXLlZvnU5iAIAgCAIAgCAIAgCAIAgCAIAgEfH4oUqbVDyGg6TyHjOV1irg5M6VVuyaifP8TiSczsbknxJnnpScnt9y+jFRWkYUdpEc5qZLPD4w1CA59Qe78R6+qZBubdN9oVi1JwlkuzEXHEBVsDz18JxtsUFs61VOx6ImO+zvH07kKlUfgbXwYCcvbxO33WXuKSvsTE0zZ8PUU9at85n20PUfdrPQ9w2yqzmy0nv2ECYd0F5MrFsfgsK262OUZhhmZelbMf6RrCvgxLFsRHpOaXq1FZG6GUqfOdlZF9mcZUWLui0wmOXk48ZvtHNxa7lnRxotY6r0cu7omdmNHuGxPoagYG9M6Hs/UfvjJGNf7Ke/Hk4ZFPtYa8+Dpgb6jhL9PZRNaPZkCAIAgCAIAgCAIAgCAIAgCAIBz299eyonSSx7tB9ZV8Rn2h8yxwId5fI4ja1SzBPhAv2nU/SVRZETDG7XPsqLn6DvMGSywDvUcKoJdjYAfKYlJRW2bQg5PSPtO7Wzf4aiFJvUOrnr6B1Dh49MrbLXN7LSupVrRdBpps20CoPEQDEYVPhHgI0jPMyRRpAcpstGjbPcVs2jWFqlNWH4gDNuVM1U2jmdpfZ5gql7Usp/DcDwmPxLszp7RPuj57vTuN/AFaoqVDhSQrEEhqRJ0LdKnhflJNN2+ku5Cvx0vxQ7ehJfDr6MAW4Cx016DJZELLd/E56ZQ+0ht3e79R3S6wbeavlfgp82vls2vJaScQxAEAQBAEAQBAEAQBAEAQBAEwDjt66uasF6AB4n/Mo86XNc/d0LnDjqpe84zaFTNUqHpZvnpIRLFGmbKoF2Y3/4jwue+YclFbZtCLk9I+nbh7viiPTOLueHV2Ssuudj9xcU0KqPvO4WpOWzpo2rUjZjRtV5nZro2q8ya6NyPNkzVokI83TNGjPNMmpFx+FSqj03UMjKVYHmCLGaM6RZ8OqM2AxNTA1j6gP3THoOqg9RFuwywps5okHJrUZ9OzLbYz5a9uTqR3rqPIGWeBPVuvVFXnQ3Xv0Ojl2U4gCAIAgCAIAgCAIAgCAIAgCAfO9v4m9YnpcebTzNsuabfvPQVx5YJFHh8IarhbXBYX772HfYzjOSiupIqg5vofQsDuqKbpfVrZqjcr/AvUOEgXWOfwLTHqVa35OvVggtwAHYBI+iRsp8bvdh6WgbOfw8PGSYYk5d+hEsy649F1Nez99adRwpSwPO86SwtLozjHO2+qOvR5BJ5uVplGujmsXvzTSq9NEzBGKlr2GZTZgNORBF5NrxXKO2yFZlKMtJFns7eyjUtmup/qHlr5RLGku3UxHJg+/Q6CjXDAFSCDwINwe+cHtdzuuvYzLTVmUfKPts2VcUcUo1B9G/YdV87+M74stScTjlx3Wn6HL7A2nl9CXN7a352GhB67Hj+zZ0z5JqRWWw563E+hgz0iezzzWj2ZAgCAIAgCAIAgCAIAgCAIBqxNTIjt0Kx8Bec7ZcsG/cb1rmml7z5btaoTUpDmSp7r6TzR6A6/dXZQNIvbX0wP8AQxH6yDkvb0WeGtR2dzVYIpZjYAXJ6hOGm+iJG0urPmO9G8j12KKStIcB09bSwqpVa35Ky7IlY9LsU2CwNav/AC6ZI6T6q+J490TyIR7sV41k+yOt2DuY5ZWrVLAWJVL69RY8uwSLPMb6RRMhgpdZM+k05DJhvSZNWcDtzcKoalSrhqo9dmco97XY3NmHDUnlJdeU4rTRFsxYye09HNYqhisIfvqLAfEvrL4j6yVDIhIiTxZx95d7ub1NTIKtdfeUnRv0PX85tZXGaOddkq2fUdn4xK9NaiG6sO8HmD1gytnFxemWMZKS2ig+0fCCrs/Eg+6mcdqEN9JmnpYhd1rkfGthqx9Ayi+Vwzflz2PzB7pb1LckU83+A+pgW0HCelPPHsyBAEAQBAEAQBAEAQBAEAQDViqAqIyG9mFjbonOyCnFxfk2rnySUl4Odx+wlp01JbM/pc7MdL+qwVQOQAPCVWTjKmpa9Szx8h22PfodRuhQH8OunvVP7zKG9fjZ6DGf+WjbvRh3fD1EpWzm1rkgcRxNpzrmoS2ztbW7IOKOK2dumKf3mIIJGpvpTW3PX5mZsvlN6iKsWFa3Lq/0Ol2dVojKdQp9lyjrTPYxFv1nOWNYlto6Ryq5PSZ0tGjOGjq2SVSZNTaizJqyQiTZI1bKzH4/DgtTcliPbCpUqhepioIB6uM7RolJdEc3fGHdnK7V3Go4kfxGCqqjHUFdabdINuE2hOdT0zWcK7Vv9To9xtk18LQdMQVzmoWAQlgBlVb3IGpI4RdYpvaNaq3BaN++g/0GN/7er/YZyr/Oje3+G/gfIvs8W79iP/co+s9Fw9bt+R57Neqvmd/LwpxAEAQBAEAQBAEAQBAEAQBAAF9BxmspKK2zMYuTSXdldt9wq5L+tcE25Tz2RxSORP2UF09T0lfB5Y1Xtpvr6fEttyHzYVT+OqPCowlZf+cn438MuKqXkWRNgcL9obMypRRXZic1gDksPeY8DrwF+k9EkY0oQTk+5HyoWWNQiuhTbHG0KVgl3Thkb1lI6OGk7ffIb6o4Ph89dz6nsFWNFC9NqbfCxUkdV1J06OrlIlrjKW4kqqM4x1PuWYpTno6bMhTjRhmja4qihV/h1zV8pCC4XU6XBOgIFz3TpXpP8XY5Wb107nz5tm7XSzhKYC8KYIYf+XDMe+S3lRXRIjLCb7yJ25mNxIxhSrhHpCqD6QKj+gzKpIqg6hD6uU665h0TW2yFkd+Ub10zqen2PorCRWdkVO8WHFXDV6TGyuhQkWuA/qkjxmIPUkzMo8y16ny77MNmB6mJQPYoCq35+vwP9MuacxY8lJreyoswZZMXGL1o62tSKMVYWYcRPRV2RsipxfRnnrK5VycJLTRhOhoIAgCAIAgCAIAgCAIAgCAbaT5FqVOarp2tpfwvKbjdzhQoryy94BQrMhzf+lHG4usXzntnl8d6sR6zOW6ZI7TcpLYVR+N/M3+sl3/nKzFX4C7YSLImxRi2HVuIBnM6djZToKOAgwyVRYCbJmriTEYTfmObgbBaNmvKe5ZlGGjzKJsYPVUQDFzNGZSKHfI/6LFWNj6JgCOIJsARNqetiNLukGz5zuwTTfEVlFgz02t0F0FRh3F7TOY9KK9NnfhkVKU366O72uRUSlW5kZT4XH1l1wK9vmrfxKL7QY6i42L4FXPRHmxAEAQBAEAQBAEAQBAEAQD1henUXqB8Dr85Q8eg3VGXoz0X2csSulH1RyxoWzD96zzlC3Yj0+ZLVUn7jsNzT9wR0VG+SyXkfnK3D/h/MuqhkaRNialrTg2d9HrYm0bHKQam1QpN5lSXk25PQ10d42U20tNfaNdjf2MWupZ0Nv35CZ9szm8dFhhseGm0Z9TjZVolLWnXmOLibBUmdmujB2mjZukUe97f6PEflA8XUTpj/wARHLIX+Uzlt3qIfBKABmzupNtTY6E9OhA7pjNX4zrw2X4S+2iMlGlT58fAW+stuAVvnlL0X7lT9orE4Rj6vf0KyeoPKCAIAgCAIAgCAIAgCAIAgGVNrH59h4yNl0K+qVfr+5Jw8h490bF4/Yq9oUQA3l16ieMqrlXfyTWmj3OVZG3Fc4PaZp3c216LEUsMT6lQ1CfzZVydnsMP/KTL4bXMVmJa1JQ9TtMRVkCXYtodyA1a3OcH3JHg5bam85LFKOi83OpP5QeXWZPpw1rc/oVeRnveq/qVGLrekU/fnP0hyDfxkv2MNa0iB94tb3zP6kbZ2OxKMBW9ele2fgy9ZtoRIl2HFrcO5Px+IzT1Z1Xqe7Y3mdKpoYdh6pszmxF+YUcNOk+E0ow01zT+h0yeIyUuWv6l1sfatRVBGJJfibsCD1ZTp5SZ7CvWtFd96t5t8x1uy96Eay1h6N+n3D3+736dciWY0o9Y9UTqsqMukujOlWpI2yToyNSYbM6OP362gQpoj2SozdRzqwP+3/dJuJXtc5AzLdPkRhuIFGGdnOnpnt/Sk0ylzWJLudsF6qbfRepI2hifSOTyGg7J6nhuK8elKX5n1Z5TieWsi9uP5V0X9/mR5YFeIAgCAIAgCAIAgCAIAgCAIBoxq3R/yk+AvIuVTCdbbXVLoSca6cJqKb0+68HzjbWJZKwdTZkysp6CPWB8ZQNbWi7i2ntFxtbeCqMQla9nC+zrlyk6p2aeOs5+xjycp3+8z9p7QsNqbxpUw+dDx0ZfeB+A+I7pEpocbG5eCdk5alUuTz+hwtWs9QniepQTbuEluRWJN9jBaT3tke/Rla/haY5l6m3JLtpnQ7ubt167XqekpURxvmR3/CoPLrnG3JjBdOrJFOLKb/EtIx3j3PqYc+kw6s9I8VF2dfqwmtOSpdJdGb34jg9w6oonRk9tGX8ysvzEkKSfYiOLXdE3DY6rStqch4Bgcp7L/MTZTXhhxa6tH0XcnedTSqLVeyoMy31IF7FB06lbdsiZFLk04+SdjZCUWpvsQ9pbw1KjmupylCDTHEAA6g9NwTf/ANSRCiMYcr8kWeTKVnOvBF2jtE1/SVG4uL24200HcLDunSEFCKijlObnJyZZbuD7hessf9xH0l5g1QVanpb9fJTZt03Nw2+VePBZyeQRAEAQBAEAQBAEAQBAEAQBAEA8YX0mGtrQT09nyzeOmVrODx0Hhp9J5iceWTiz0UJKSTMNsVbupHA01PzmDYiU6vqgG5Be5A4mwHDxaay2+xmOk+pc7N2hVd1SiiUqY1y2z5rfETx7pw+6xf5ntkn75KOlBJL0O72bkqLfKL+8psbH6iV9tUqpaLSq6N0d/oNqYvC4dQaoCk8FTMjt2BCD3zNcZzfQ1slCC2zzZ9HC4gHK1W/NWq1iw7mY+U6T56n+KK+hpHktX4ZP6mqvuPgixq1WqZBqyl1WnYaksct7d8ysmb6JGjxYd5M5raW0f4upWOHVVoIAERlGWoAbFm5i+lugSTXjLl2+5GszJc2l+X0KjZ1X7xrIUX4Sc1iOIv23kiCa7kSbTe0tFi1fRh1GbmoFay930gydvgKHo6VNDxVQD22187z0dMOStR9x566fPNy95InU5iAIAgCAIAgCAIAgCAIAgCAIAgHB/aBg8tRKoGjgg/mX9QfIyk4hVy2cy8/uW+DZzQ5X4OZqvmVOoFfA3HkRIBNN2y6IZjfkPnCDLXDuKdVbfCZsYLDG7bNBGqIfXGg6NdNekfpNJwjNaZvXZKt7iczTxTO/pajFnJBJOp7OodUzGKitISm5PbO3dVOV1OVtCCNCNJlpNaZiMnF7RRb27ar1MtF6g9EADZRlzm51fptYacOqcq6IQe0drMidi0yLu/Wy5+y3nOxwJGLYXuOJ4zBkiekgFvu7h/TVlB9lfXPcRYeNvAyVh1e0tW+y6kbLs5K36vodzL8oxAEAQBAEAQBAEAQBAEAQBAEAQBAK3eDZv8TQen7/ALSHoYcPHUd8j5VPta3Hz4O+Pb7Ke/Hk+V2IzKRYg6g8QRoQfPwnnNa6Mvfejds+tlbtEIMl4ir6ynqM2CIe0q5K26xBhmii2kbMnTU8aco15CDJRbTrZ37BDYNuAfKDMIGypWvMg1q/OYB9A3W2caNLMwtUezHpA91fMnvl7hUezht92UuZd7Sel2RdSaRBAEAQBAEAQBAEAQBAEAQBAEAQBAEA5DfLdw1L4igt6n/2KOLW99RzbpHPt41ediOX+ZDv5LHDytfgn8jhCeYlQWZINS4BmzXQwu5pxWoM1NmaqR0mTCLQVdIRkgs1yTMMySE0E2iumzVvweA3gydVupsEuVr1VtTGqKffPJiPh6Ons42OHiuT55rp4IGXk8q5Id/J20uCpEAQBAEAQBAEAQBAEAQBAEAQBAEAQBMAn0dk1Dq3qDr9r+n9ZRZn2hxMfcYvmfu7fUn08Ots6vovf/Y5rercuhWu9JvR1+ZPsOfxKOB6x33nlpcelZc5Sgkn4X/Opd14fJDlT38T5vtDZtbCtlrIQDwPFG/Kw+XGXOPkVXLcHv8Ac4zhKPciVJvKOmE9o005troYJpb1b9UJdDOzTQUsQBNVHmYb0i12bsuti6go4ak1RueUaAfEzHRR1kza+6uqO5PSNIJtn1Tdb7K6dMZ8a+eryRP5SHpJI+8PaLdR4yknxlqxOuO0vXydnRzRab18C7xu7FVNaZFRej2X8Doe4z0eJ9o8a3SsXI/qvqVF3DrI9Y9f3KRlIJBFiNCDoQRyMv4yUltdivaa6M8mwEAQBAEAQBAEAQBAEAQBAEAQBBgxdrTBDtzYR6R6sjVMSw1XQjhNZLaaZHWXY3vei/wW8lKtZKxFKsdNdKbn8Lcj+E915884nwO3Hk5QW4/87ntMDideRFJ9JehhtTDsNbTz/Lp9S2iznsfTWopSooZTxBFxJVM5Vy5oPTMtKS0zjMdupZvunPozyNiyX5g+8Orj2y+q4onHVi6/v/Yiyxuv4WU2M2HXo6tTJThmW7LwJ7RoDx6JOoy6bOifX0ZwsqnHwbtn7Gr4orSoJc2BZicqKDwJPceHRNsrLpx4bmzWFcpvaR2+yfsvcsFqVstIAZ2UDPUJ1yoD7Cjhc6k304Snlx2Ch+CPV/p8f9jt93e+rPqmwtj0cJTFLD0gicTbix4ZmY6sesyntvsvlzWPZ2UVHoi2RZhQZjZA2jtylRuoOep8K8vzHl8+qXOBwe/JaetR9X/T1KvP4rRiR6vcvRf86HIYhvSuzt7TEk208J7+iqNNca49ktHhrOKXysc2+77Gl8P0TrslUcUhLpYte/waCJktE01tCZMiAIAgCAIAgCAIAgCAIAgwG07ZqU+Vlub5Idv3I1RoIsURajTB1SI1emGBBFxNWtneEnF7RpoY3EYfSjVOT4H+8TsAPsjstKnL4RjZHWUevqujLnG4pbDps3rvOh0xGGIPxUjcf0Nw8Z5zI+zdketM/k/7ovaeLQl+ZErD47A1OFfL1OtRD8rHulXZwziEOns9/DqTo5tD/wBRjj9r4ewFE56dMnOxuqlzl0Fxc2B4/ikzh/A77pNXPl8vyyNlcShUlyLmb7f1IuycYuHxDVqilaRCh7AtlzEZGAGpFzbvkvivA7I1RjW+br57nLE4tC/pLofQKO9GCABFUsehEqMfISoo4LmS6ezfz6Ha3Px61uU0Y1d7SdKOHP5qhC9+UXJ8peY/2atfW2SXw6sp8j7RUQ6Vpyf0IFfGYmv/ADKpC/Cn3a+Wp7zL3G4TiY/VR2/V9f8AYosni+Zf0T5V7j2hhANLSxc/QrY08z3I3+gHRNednR48PQNheibKz1OFmJ5iQ69C/HRp1TGLlzx5csvy/t8CCRbQ8ZsejjJSW12EybCAIAgCAIAgCAIAgCAbKSaE+H1mkn4IObY1Dlj3ZHqtMlNFEOo0EiKMAswbbPGSAmR6lKY0dYyIz4QHlNeU7q5o8/guqOUe3Lfdrd30tKooIB9KTqCRYommnZPL8T4pPh2atLcZRW182X+NirOxk96afR/I6Z92Uw2ErMSGcimOFlADroLzbE4xLNy64qPLFb+umR8zh33bFsscty6e7yv3KWlTA4CepPIyk33J+Fp85pNnWmO+pPRJx2S1E2qIGtCrwhdxPsRsPjORm8q/QjVZK3qRvroGFxMQlpmcipTW0VeLp+9zHGSEdOF5DT9lL5EWbF4IAgCAIAgCAIAgCAJgEqt6q27v1nFPcioyZ72yqqtOpDiiFXqWmCTCOyUgg4tnpWZMbMCkG3MeeigzzHuS0GN7NmGxlRaD+jvrUbQEgnKKY4jqJlQ8am7OlOaTcYrSfvb6lw7bKsSuClqMm9tfoi12Pi6rUcVTJZqWRGGe90bOoK6zfIx6Y5FVkUlLevitM5Rvslj2Vt7Wt99+Vr6mhBLMoGWGGGk5TJVPYmpORLRnAZqrVLAzeK2zhbZyoo3rWa0kEJQ3HZZ4OvyM5Tj5OlNmvwsV11PQZtF9DjNuu1SXxKxlsSJ0PUwmpxUl5PJk3EAQBAEAQBAEAQDZh1uw6tZpN6RztlqLPMe/KaVopr31SK950OaKjbb2Q246TWXYn4a3MuaS6CZK+b6mVpk12MsDZ7lgbBS8BS0Tdk1qNNGp1qTMpfOCvK4A5G4OnnPMcX4dmzyY5GI9PWu+mel4bxDEWO6cn18raLivtTD+gejRpspa2pFuBBuSTc8JrgYHEHkxuyn0j79mufn4McaVOMusvRa+pTqJ6g8myXh3E5zJNMvBNptOLaJkds2hSeAPgZrzxXdo35JPsmRMahFrgjtBE7UzjL8rTK/LhOOuZNfFHLox9LUv8ZHgbDyEk66HeSXs4/BFvh3mjIMuj2TnNwDNY9GLXzJMg4pdb9P0/YnRF1wyzmp5fQ0zJZCAIAgCAIAgCAIBJwg0J/f74Tja/BGyJdkQsS1yZtFaRTSe5NkZpsZRUY1c9SmnSwv2DU/KGT6XyQlL3F8BBWCDB7aAe2gwegQYMgIMM2LBqzZSazJfhnUHsLCQuIznDFslB6aiybwyuFmXXGa2tn0WlTUAWVR2ACfOVkWS6uT+rPo/sa12ivob1tN+ffkzypGV4ckZ0Ve8qhqDdIKkeNvkTLXgd2sxRXlMpftBUpYUm/DT/U+Y4xMtZuhrN5WPmJ75djx1cuale7oTsOZoyLYifTbS018nLw0acSLjsmyJ3C7OW1x9URZsehEAQBAEAQBAEA8mAWu0ME2HWzDkNfdJI1APbp3Ssxc6rKe4Pr6eSPxCiyltyXTXcomMsSjRqqGZOkUV2CGauT8Knz0/WYJdr5aNepckwVwmQeiAZCDB6IMGQg1MxBqz1luLfvtms4KcXGXZ9DauyVc1OPdE3B7bxBQXqm/YnLulQuAYC/0fq/7lxdx3O5nqevkv7EyjtWqfaqHyHym/+DYUe1a/V/ucq+NZknqVj/RfsiQcW599vEzK4fjL/tx+iO0s/If+t/Ug4yoTa7E9pJkymmuv8sUvgiry77J9JSb+ZSbXTVG7R9R9ZLiYxX0aPcMZhmtiJ1MzUjvoS8FgmrsEUGx0JtcKD7xkbKyq8etzm/l6kzhuPbdkR9mvPV+iKzEUSjMje0rFT2g2MkVWKyCnHs1s9LOLjJxfgwnQwIAgCAIAgCASNnU81WkvS6+FxfykXNs9njzl6J/sdaI81kV70d87cjqOg6ifMZTceq7nqHFSWmVtfZOHf2qK3/DdP7SJIq45mVdFNv49SFZwrEs7wXy6ELEbtYYjg47G/UGTI/afLXfT+RG/wLF8J/U5TF7NpUKpFMsbjXMQeBNrWA656TgnEbc2E52JdGktFHxvFhjuEIe9msmXpQaAMyDIGDUyEGDIQYMhBqZiDBkDBg04M6d7fMwdLl1JStMHAkJXM1cUbq1o8qPeZS0aSlzMyw2Cp12CVM2XiMpANx2g9cruK5lmJju2vvtdy14JjwvyfZz7NMvcNu3hh8Z7WH0AnlX9psp+n0PW/wDT+J539Szw+xsOvCkD+Ys/kTOU+N5dneevh0OtfBcKvtBP49SxQACygAdAAA8JXWWym9yeyxhXGC1FaXuOA3np5cTV68reKi/nee/4JZz4UPdtfRlBmx5b5FXLYiiAIAgCAIAgE7Yf/UUvzfQyv4r/ACdnwJGJ/Hj8Ttak+aW9j0yNchM3NdbhMA4fbH84/lHzM959lP5af/1/RHjvtJ/Gh8P6kIz1R5w9EyYZkIMGQgwZiDUyEGDIQamUGDRg+B/M39xg63d/kiUJg4M2CDU9gwTNl/zF7/kZTcf/AJGfy/dF19n/AOej8/2OroT5x5PoxLSdomGbBNzU4ffD/qD+RfrPe/Z3+SXxZQ8R/j/JFLL0giAIAgH/2Q==","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUBZnlHv0yoZkVdTAD8e7CjHl7HJXhDPrIw&s"]
  const commentsCount = 12
  const filesCount = 0

  return (
    <Card 
      variant="outlined" 
      sx={{ width: '300px', mb: 2, cursor: 'grab' }}
      draggable="true"
      onDragStart={(e) => onDragStart(e, task)}
    >
      <CardContent>
        <Chip
          label={priority}
          size="small"
          color={priority === 'High' ? 'error' : priority === 'Medium' ? 'warning' : 'default'}
          sx={{ mb: 1 }}
        />
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {taskname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <AvatarGroup max={4}>
            {avatars.map((avatar, index) => (
              <Avatar key={index} alt={`Avatar ${index}`} src={avatar} />
            ))}
          </AvatarGroup>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton size="small">
              <CommentIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2">{commentsCount}</Typography>
            <IconButton size="small">
              <AttachFileIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2">{filesCount}</Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

const Content = ({ projectName, addTaskTodo, fetchtodo, updateTaskStatus }) => {
  const [taskName1, setTaskName1] = useState('');
  const [priority1, setPriority1] = useState('');
  const [dueDate1, setDueDate1] = useState('');
  
  const [anchorEl1, setAnchorEl1] = useState(null);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1  (null);
  };
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? 'simple-popover' : undefined;
  const [taskData, setTaskData] = useState({
    taskname: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "Todo"
  });
  
  const [columns, setColumns] = useState({
    Todo: [],
    onProgress: [],
    done: []
  });

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchedTasks = fetchtodo().payload?.[projectName] || [];
    const newColumns = {
      Todo: fetchedTasks.filter(task => task.status === "Todo"),
      onProgress: fetchedTasks.filter(task => task.status === "onProgress"),
      done: fetchedTasks.filter(task => task.status === "done")
    };
    setColumns(newColumns);
  }, [projectName, fetchtodo]);

  const addVals = (e) => {
    setTaskData(prevUser => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      avatars: [],
      commentsCount: 0,
      filesCount: 0
    };
    addTaskTodo({ projectName, taskData: newTask });
    setColumns(prev => ({
      ...prev,
      Todo: [...prev.Todo, newTask]
    }));
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setTaskData({
      taskname: "",
      description: "",
      dueDate: "",
      priority: "",
      status: "Todo"
    });
  };

  const onDragStart = (e, task) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, newStatus) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData('text/plain'));
    
    if (droppedTask.status !== newStatus) {
      const updatedTask = { ...droppedTask, status: newStatus };
      
      setColumns(prev => ({
        ...prev,
        [droppedTask.status]: prev[droppedTask.status].filter(t => t.id !== droppedTask.id),
        [newStatus]: [...prev[newStatus], updatedTask]
      }));

      updateTaskStatus({ projectName, taskId: droppedTask.id, newStatus });
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'add-project-popover' : undefined;
  const currentDateFilter=()=>{
    const date = new Date(); // Get the current date

  // Extract the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0'); 

 const cDate= `${year}-${month}-${day}`;
 console.log(fetchtodo().payload[projectName],"dkkdkk");
 console.log(cDate,"ldlkk");
 
  const filterData = fetchtodo().payload[projectName].filter((object) => cDate == object.dueDate);
  console.log(filterData,"dkkk");
  
  const newColumns = {
    Todo: filterData.filter(task => task.status === "Todo"),
    onProgress: filterData.filter(task => task.status === "onProgress"),
    done: filterData.filter(task => task.status === "done")
  };
  console.log(newColumns,"lkkmmm");
  
  setColumns(newColumns)
  }
  const handleFilter= () => {
    
    console.log(fetchtodo().payload[projectName],"kdknnnn");
    console.log(taskName1,"kfjfdhdfbnnnnjdnhyg66");
    console.log(priority1,"pp");
    
    
    const filtered1 = fetchtodo().payload[projectName].filter(task =>
      (!taskName1 || task.taskname==taskName1) &&
      (!priority1|| task.priority === priority1) &&
      (!dueDate1 || task.dueDate === dueDate1)
    );

    // Update filtered tasks list
    console.log(filtered1,"kdkkjj1");
    
    // // setFilteredTasks(filtered);
    const newColumns = {
      Todo: filtered1.filter(task => task.status === "Todo"),
      onProgress: filtered1.filter(task => task.status === "onProgress"),
      done: filtered1.filter(task => task.status === "done")
    };
    // console.log(newColumns,"dkdkjkjjnnn");
    
    setColumns(newColumns)
    handleClose1()
  };
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" fontWeight="bold" mr={2}>
            {projectName}
          </Typography>
          <IconButton size="small" sx={{ color: '#7b61ff' }}>
            <InsertLinkIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          
          <div style={{backgroundColor:"lightblue" ,borderRadius:'2px' ,padding:'0px'}}>

          <Plus style={{color:"blue",width:"20px",height:"20px",padding:'1px'}}/>
          </div>
          <label htmlFor="" style={{color:"blue"}}>
            Invite
          </label>
          <AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 30, height: 30, fontSize: '0.8rem' } }}>
            <Avatar alt="User 1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUBZnlHv0yoZkVdTAD8e7CjHl7HJXhDPrIw&s" />
            <Avatar alt="User 2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpgH-Ja36phm6ZMX8IfMAUeTQgtc3RsdMpog&s" />
            <Avatar alt="User 3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBpnouxDuF063trW5gZOyXtyuQaExCQVMYA&s" />
            <Avatar alt="User 4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2ESAAPJ-Dnv6BQriLU629rm0eDtFN8S_iQ&s" />
            <Avatar>+2</Avatar>
          </AvatarGroup>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            size="small"
            onClick={handleClick1}
            sx={{
              color: 'black',
              borderColor: '#e0e0e0',
              textTransform: 'none',
              '&:hover': { borderColor: '#a0a0a0' }
            }}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<CalendarTodayIcon />}
            size="small"
            onClick={currentDateFilter}
            sx={{
              color: 'black',
              borderColor: '#e0e0e0',
              textTransform: 'none',
              '&:hover': { borderColor: '#a0a0a0' }
            }}
          >
            Today
          </Button>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            size="small"
            sx={{
              color: 'black',
              borderColor: '#e0e0e0',
              textTransform: 'none',
              '&:hover': { borderColor: '#a0a0a0' }
            }}
          >
            Share
          </Button>
          <IconButton sx={{ bgcolor: '#5030E5', color: 'white', '&:hover': { bgcolor: '#3a1bb1' } }}>
            <ViewModuleIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" p={2}>
        {Object.entries(columns).map(([columnId, tasks]) => (
          <Card 
            key={columnId}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, columnId)}
            sx={{ minWidth: 300, minHeight: 500, margin: 1 ,backgroundColor:"#F0F0F0"}}
          >
            <CardContent>
        
              <Box display="flex" justifyContent="space-between" alignItems="center"  mb={2}>
                

                <Typography variant="h5" >{columnId}</Typography>
                
                
                
                {columnId === 'Todo' && (
                  <IconButton onClick={handleAddClick}>
                    <Plus size={16} />
                  </IconButton>
                )}
               
                
              </Box>
              {
                columnId=='Todo'?<>
                 <div className="horizontal-line mb-3" style={{width:"100%",height:"3px",backgroundColor:'blueviolet'}}/>
                </>:columnId=='onProgress'?<>
                <div className="horizontal-line mb-3" style={{width:"100%",height:"3px",backgroundColor:'orange'}}/>
                </>:columnId=="done"?<>
                <div className="horizontal-line mb-3" style={{width:"100%",height:"3px",backgroundColor:'green'}}/>
                </>:""
              }
             
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
              ))}
            </CardContent>
          </Card>
        ))}
      </Box>
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
            label="Task Name"
            variant="outlined"
            name='taskname'
            onChange={addVals}
            value={taskData.taskname}
            fullWidth
          />
          <TextField
            variant="outlined"
            name='dueDate'
            value={taskData.dueDate}
            onChange={addVals}
            type='date'
            fullWidth
          />
          <TextareaAutosize
            maxRows={5}
            minRows={1}
            style={{ resize: 'none', padding: "12px" }}
            placeholder='Description'
            name='description'
            value={taskData.description}
            onChange={addVals}
            fullWidth
          />
          <TextField
            select
            label="Priority"
            name='priority'
            value={taskData.priority}
            onChange={addVals}
            fullWidth
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="secondary">
            Add Task
          </Button>
        </form>
      </Popover>

      <Popover
        id={id1}
        open={open1}
        anchorEl={anchorEl1}
        onClose={handleClose1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div style={{ padding: '16px', width: '250px' }}>
        
          <TextField
            label="Task Name"
            value={taskName1}
            onChange={(e) => setTaskName1(e.target.value)}
            fullWidth
            margin="normal"
          />
      
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority1}
              onChange={(e) => setPriority1(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        
          <TextField
            label="Due Date"
            type="date"
            value={dueDate1}
            onChange={(e) => setDueDate1(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
          />
         
          <Button
            variant="contained"
            color="primary"
            // onClick={handleApplyFilter}
            style={{ marginTop: '16px' }}
            fullWidth
            onClick={handleFilter}
          >
            Apply Filters
          </Button>
        </div>
      </Popover>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addTaskTodo: (obj) => dispatch(addTaskTodo(obj)),
  fetchtodo: () => dispatch(fetchtodo()),
  updateTaskStatus: (obj) => dispatch(updateTaskStatus(obj)),
});

export default connect(null, mapDispatchToProps)(Content);