"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[614],{4614:(e,r,n)=>{n.r(r),n.d(r,{default:()=>Y});var s=n(5043),t=n(344),i=n(8903),a=n(5865),o=n(7642),l=n(9336),d=n(1906),m=n(6240),c=n(6971),x=n(1318),u=n(7260),h=n(2819),p=n(6446),j=n(3193),A=n(9190),g=n(9859),y=n(1673),f=n(1787),b=n(7392),w=n(4605),_=n(1962),v=n(3516),C=n(3918),k=n(9681),S=n.n(k),I=n(4556),P=n(9743),q=n(2976),B=n(931),z=n(3033),F=n(579);const W=e=>{let{...r}=e;const n=(0,c.Zp)(),o=(0,m.A)(),k=(0,t.A)(o.breakpoints.down("md")),{register:W}=(0,I.d4)((e=>e)),[D,E]=(0,s.useState)(!1),[T,Y]=(0,s.useState)(!0),{enqueueSnackbar:R}=(0,C.dh)(),[N,L]=(0,s.useState)(0),[M,H]=(0,s.useState)(),[O,U]=(0,s.useState)(""),V=()=>{E(!D)},Z=e=>{e.preventDefault()},G=e=>{const r=(0,B.x)(e);L(r),H((0,B.t)(r))};(0,s.useEffect)((()=>{G("123456")}),[]);const K=(0,I.wA)(),$=e=>{""!==O?K((0,P.OH)({user:{first_name:e.first_name,last_name:e.last_name,email:e.email,password:e.password,confirm_password:e.confirm_password,phone_number:e.phone_number,username:e.username,pin:O},navigate:n,enqueueSnackbar:R})):alert("please set your transaction pin")};return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(i.Ay,{container:!0,direction:"column",justifyContent:"center",spacing:2,children:[(0,F.jsx)(i.Ay,{item:!0,xs:12,children:(0,F.jsxs)(p.A,{sx:{alignItems:"center",display:"flex"},children:[(0,F.jsx)(l.A,{sx:{flexGrow:1},orientation:"horizontal"}),(0,F.jsx)(i.Ay,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:(0,F.jsx)(p.A,{children:(0,F.jsx)(a.A,{variant:"caption",fontSize:"16px",children:"OR"})})}),(0,F.jsx)(l.A,{sx:{flexGrow:1},orientation:"horizontal"})]})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:(0,F.jsx)(p.A,{sx:{mb:2},children:(0,F.jsx)(a.A,{style:{textTransform:"uppercase"},variant:"caption",fontSize:"16px",children:"Sign in with Email address"})})})]}),(0,F.jsx)(v.l1,{initialValues:{first_name:"",last_name:"",username:"",email:"",phone_number:"",password:"",confirm_password:"",pin:""},validationSchema:z.Ik().shape({email:z.Yj().email("Must be a valid email").max(255).required("Email is required"),password:z.Yj().max(255).required("Password is required"),confirm_password:z.Yj().required("Please re-enter password").oneOf([z.KR("password"),null],"Passwords           must match"),username:z.Yj().required("Username is required"),first_name:z.Yj().required("First name is required"),last_name:z.Yj().required("Last name  is required"),phone_number:z.Yj().required("Phone number  is required"),pin:z.ai("Pin must be a number").required("Please set your transaction pin")}),onSubmit:$,children:e=>{let{errors:r,handleBlur:n,handleChange:s,touched:t,values:l}=e;return(0,F.jsx)(v.lV,{children:(0,F.jsxs)("container",{spacing:k?0:2,children:[(0,F.jsx)(i.Ay,{item:!0,xs:12,sm:12,children:(0,F.jsxs)(j.A,{fullWidth:!0,error:Boolean(t.first_name&&r.first_name),sx:{...o.typography.customInput},children:[(0,F.jsx)(A.A,{htmlFor:"outlined-adornment-first_name-register",children:"First Name "}),(0,F.jsx)(g.A,{id:"outlined-adornment-first_name-register",type:"text",value:l.first_name,name:"first_name",onBlur:n,onChange:s,inputProps:{}}),t.first_name&&r.first_name&&(0,F.jsx)(y.A,{error:!0,id:"standard-weight-helper-text--register",children:r.first_name})]})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,sm:12,children:(0,F.jsxs)(j.A,{fullWidth:!0,error:Boolean(t.last_name&&r.first_name),sx:{...o.typography.customInput},children:[(0,F.jsx)(A.A,{htmlFor:"outlined-adornment-last_name-register",children:"Last Name "}),(0,F.jsx)(g.A,{id:"outlined-adornment-last_name-register",type:"text",value:l.last_name,name:"last_name",onBlur:n,onChange:s,inputProps:{}}),t.last_name&&r.last_name&&(0,F.jsx)(y.A,{error:!0,id:"standard-weight-helper-text--register",children:r.last_name})]})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,sm:12,children:(0,F.jsxs)(j.A,{fullWidth:!0,error:Boolean(t.email&&r.email),sx:{...o.typography.customInput},children:[(0,F.jsx)(A.A,{htmlFor:"outlined-adornment-email-register",children:"Email Address"}),(0,F.jsx)(g.A,{id:"outlined-adornment-email-register",type:"email",value:l.email,name:"email",onBlur:n,onChange:s,inputProps:{}}),t.email&&r.email&&(0,F.jsx)(y.A,{error:!0,id:"standard-weight-helper-text--register",children:r.email})]})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,sm:12,children:(0,F.jsxs)(j.A,{fullWidth:!0,error:Boolean(t.phone_number&&r.phone_number),sx:{...o.typography.customInput},children:[(0,F.jsx)(A.A,{htmlFor:"outlined-adornment-phone_number-register",children:"Phone Number "}),(0,F.jsx)(g.A,{id:"outlined-adornment-phone_number-register",type:"number",value:l.phone_number,name:"phone_number",onBlur:n,onChange:s,inputProps:{}}),t.phone_number&&r.phone_number&&(0,F.jsx)(y.A,{error:!0,id:"standard-weight-helper-text--register",children:r.phone_number})]})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,sm:12,children:(0,F.jsxs)(j.A,{fullWidth:!0,error:Boolean(t.username&&r.username),sx:{...o.typography.customInput},children:[(0,F.jsx)(A.A,{htmlFor:"outlined-adornment-username-register",children:"Username "}),(0,F.jsx)(g.A,{id:"outlined-adornment-username-register",type:"text",value:l.username,name:"username",onBlur:n,onChange:s,inputProps:{}}),t.username&&r.username&&(0,F.jsx)(y.A,{error:!0,id:"standard-weight-helper-text--register",children:r.username})]})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,sm:12,children:(0,F.jsxs)(j.A,{fullWidth:!0,error:Boolean(t.password&&r.password),sx:{...o.typography.customInput},children:[(0,F.jsx)(A.A,{htmlFor:"outlined-adornment-password-register",children:"Password"}),(0,F.jsx)(g.A,{id:"outlined-adornment-password-register",type:D?"text":"password",value:l.password,name:"password",label:"Password",onBlur:n,onChange:e=>{s(e),G(e.target.value)},endAdornment:(0,F.jsx)(f.A,{position:"end",children:(0,F.jsx)(b.A,{"aria-label":"toggle password visibility",onClick:V,onMouseDown:Z,edge:"end",size:"large",children:D?(0,F.jsx)(u.A,{}):(0,F.jsx)(h.A,{})})}),inputProps:{}}),t.password&&r.password&&(0,F.jsx)(y.A,{error:!0,id:"standard-weight-helper-text-password-register",children:r.password})]})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,sm:12,children:(0,F.jsxs)(j.A,{fullWidth:!0,error:Boolean(t.confirm_password&&r.confirm_password),sx:{...o.typography.customInput},children:[(0,F.jsx)(A.A,{htmlFor:"outlined-adornment-confirm_password-register",children:"Confirm Password"}),(0,F.jsx)(g.A,{id:"outlined-adornment-confirm_password-register",type:D?"text":"password",value:l.confirm_password,name:"confirm_password",label:"Confirm Password",onBlur:n,onChange:e=>{s(e),G(e.target.value)},endAdornment:(0,F.jsx)(f.A,{position:"end",children:(0,F.jsx)(b.A,{"aria-label":"toggle password visibility",onClick:V,onMouseDown:Z,edge:"end",size:"large",children:D?(0,F.jsx)(u.A,{}):(0,F.jsx)(h.A,{})})}),inputProps:{}}),t.confirm_password&&r.confirm_password&&(0,F.jsx)(y.A,{error:!0,id:"standard-weight-helper-text-confirm_password                  -register",children:r.confirm_password})]})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,sm:12,children:0!==N&&(0,F.jsx)(j.A,{fullWidth:!0,children:(0,F.jsx)(p.A,{sx:{mb:2},children:(0,F.jsxs)(i.Ay,{container:!0,spacing:2,alignItems:"center",children:[(0,F.jsx)(i.Ay,{item:!0,children:(0,F.jsx)(p.A,{style:{backgroundColor:null===M||void 0===M?void 0:M.color},sx:{width:85,height:8,borderRadius:"7px"}})}),(0,F.jsx)(i.Ay,{item:!0,children:(0,F.jsx)(a.A,{variant:"subtitle1",fontSize:"0.75rem",children:null===M||void 0===M?void 0:M.label})})]})})})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,sm:12,children:(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(a.A,{children:"Set Transaction Pin"}),(0,F.jsx)(S(),{style:{margin:"auto"},length:4,initialValue:"",secret:!0,onChange:(e,r)=>{U(e)},type:"numeric",inputMode:"number",inputStyle:{borderColor:"black"},inputFocusStyle:{borderColor:"blue"},onComplete:(e,r)=>{},autoSelect:!0,regexCriteria:/^[ A-Za-z0-9_@./#&+-]*$/})]})}),(0,F.jsx)(i.Ay,{container:!0,alignItems:"center",justifyContent:"space-between",children:(0,F.jsx)(i.Ay,{item:!0,children:(0,F.jsx)(w.A,{control:(0,F.jsx)(_.A,{checked:T,onChange:e=>Y(e.target.checked),name:"checked",color:"primary"}),label:(0,F.jsxs)(a.A,{variant:"subtitle1",children:["Agree with \xa0",(0,F.jsx)(a.A,{variant:"subtitle1",component:x.N_,to:"#",children:"Terms & Condition."})]})})})}),r.submit&&(0,F.jsx)(p.A,{sx:{mt:3},children:(0,F.jsx)(y.A,{error:!0,children:r.submit})}),(0,F.jsx)(p.A,{sx:{mt:2},children:(0,F.jsx)(q.A,{children:(0,F.jsx)(d.A,{sx:{borderRadius:"30px",backgroundColor:{backgroundColor:"green",":hover":{backgroundColor:"#83529f"}},textTransform:"uppercase"},disabled:!!W.loading,disableElevation:!0,fullWidth:!0,size:"large",type:"submit",variant:"contained",onClick:()=>$(l),children:"\u25bc register"})})})]})})}})]})};var D=n(5912),E=n(3699),T=n(3413);const Y=()=>{const e=(0,m.A)(),r=(0,c.Zp)(),n=(0,t.A)(e.breakpoints.down("md")),[u,h]=(0,s.useState)("");return(0,F.jsx)(E.A,{children:(0,F.jsxs)(i.Ay,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[(0,F.jsx)(i.Ay,{item:!0,xs:12,children:(0,F.jsx)(i.Ay,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:(0,F.jsxs)(i.Ay,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:[(0,F.jsx)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center"},children:(0,F.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"150px",width:"150px",borderRadius:"50%",backgroundColor:"#f1f0f5",position:"relative",top:100,zIndex:1e3},children:(0,F.jsx)("img",{src:T,style:{height:"100px",width:"100px",margin:"auto"},alt:"Sharha"})})}),(0,F.jsx)(D.A,{children:(0,F.jsxs)(i.Ay,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[(0,F.jsx)(i.Ay,{item:!0,sx:{mb:3,mt:10},children:(0,F.jsx)(x.N_,{to:"#",style:{textDecoration:"none"},children:(0,F.jsx)(a.A,{variant:"h2",sx:{textAlign:"center",textAlignLast:"center",color:"#83529f"},children:"S. DATA PLUS"})})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,children:(0,F.jsx)(i.Ay,{container:!0,direction:n?"column-reverse":"row",alignItems:"center",justifyContent:"center",children:(0,F.jsx)(i.Ay,{item:!0,children:(0,F.jsx)(o.A,{alignItems:"center",justifyContent:"center",spacing:1,children:(0,F.jsx)(a.A,{style:{textTransform:"uppercase"},variant:"caption",fontSize:"16px",s:!0,textAlign:n?"center":"inherit",children:"Enter your details to register"})})})})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,children:(0,F.jsx)(W,{})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,children:(0,F.jsx)(l.A,{})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,children:(0,F.jsx)(i.Ay,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:(0,F.jsx)(d.A,{onClick:()=>{r("/pages/login")},sx:{textTransform:"uppercase",borderRadius:"30px",backgroundColor:{backgroundColor:"#83529f",":hover":{backgroundColor:"#83529f"}}},disableElevation:!0,fullWidth:!0,size:"large",variant:"contained",children:"Sign in here !!."})})})]})}),(0,F.jsx)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center"},children:(0,F.jsx)("div",{style:{backgroundColor:"#000000",width:"120px",height:"2px",position:"relative",bottom:25}})})]})})}),(0,F.jsx)(i.Ay,{item:!0,xs:12,sx:{m:3,mt:1}})]})})}}}]);
//# sourceMappingURL=614.38c8b01b.chunk.js.map