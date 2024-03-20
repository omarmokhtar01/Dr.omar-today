import React, { useEffect } from "react";

import NavBar from "../Navbar/NavBar";
import { Col, Container, Row,Spinner } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTerms } from "../../features/termCondition/termSlice";
import nodata from "../../images/nodata.svg";
import { useTranslation } from "react-i18next";

const ConditionsAndRoles = () => {
  const { t } = useTranslation('term');

  const langStorage = localStorage.getItem('lang');

  const dispatch = useDispatch()
  const termsAndCondition = useSelector((state) => state.terms.termsData);
  const isLoading = useSelector((state) => state.terms.isLoading);

  useEffect(()=>{
    let termLocation=localStorage.getItem('termLocation')

   dispatch( getTerms(termLocation)
)  },[dispatch])
console.log(termsAndCondition);
  return (
    <>
      <NavBar />

      <Container>
        <Row>
          <Col>
            <div style={{ position: "relative", marginTop: "-35px" }}>
              <h1
                style={{
                  color: "rgba(255, 255, 255, 1)",
                  fontWeight: "500",
                  paddingBottom: "25px",
                  paddingTop: "15px",
                  borderRadius: "25px",
                }}
                className=" background-image"
              >
               {t("term")} {" "}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Container style={{marginBottom:'200px'}}>
        <Row>
          {
             !isLoading ?(
              termsAndCondition  ? (
              <>
                {termsAndCondition.map((item, index) => (
                  <Col sm="12">
            <h5
              style={{
                color: "rgba(4, 32, 48, 1)",
                marginTop: "10px",
                fontWeight: "700",
                marginBottom:'50px'
              }}
            >
              {
                langStorage === "en"? (
                  <>
                  {item?.text_en}
                  </>
                ):(
                  <>
                  {item?.text}
                  </>
                )
              }
              
            </h5>

            {/* <div className="d-flex justify-content-center align-items-center">
              <p
                style={{
                  margin: "10px 75px 15px 75px",
                  color: "rgba(99, 98, 112, 1)",
                  lineHeight: "26.73px",
                  width: "85",
                }}
              >
                كالعديد من المواقع الأخرى، تستخدم منصة هداية سجلات الدخول (log
                files). وتتضمن المعلومات التي نجمعها في هذه السجلات عنوان
                الإنترنت (IP Address)، ونوع المتصفح، ومزود الخدمة، وتاريخ ووقت
                الإستخدام، والصفحات التي تمت زيارتها، والروابط التي تم الضغط
                عليها لتحليل تصرفات الزوار وأنماطهم، وذلك بهدف فهمهم و تحسين
                خدمة المنصة بالشكل المناسب. كل هذه البيانات لا ترتبط بأي معلومات
                شخصية.
              </p>
            </div> */}
            {/* <h5
              style={{
                color: "rgba(4, 32, 48, 1)",
                marginTop: "10px",
                fontWeight: "700",
              }}
            >
              {" "}
              الكوكيز
            </h5>

            <div className="d-flex justify-content-center align-items-center">
              <p
                style={{
                  margin: "10px 75px 15px 75px",
                  color: "rgba(99, 98, 112, 1)",
                  lineHeight: "26.73px",
                  width: "85",
                }}
              >
                نحن نستخدم الملفات المؤقتة (أو الكوكيز) لتخزين المعلومات عن
                تفضيلات الزوار، تسجيل معلومات محددة عن المستخدم لمعرفة سلوكه ضمن
                المنصة والصفحات التي يزورها وتخصيص محتوى صفحة الويب استنادا إلى
                الزائر ونوع المتصفح أو أي معلومات أخرى يرسلها الزائر عبر متصفحه.
                وعليه؛ فمنصة هداية تستخدم مجموعة متنوعة من أدوات تحليل الإنترنت
                لجمع هذه المعلومات غير أن بعض المعلومات تُجمَع بواسطة الكوكيز،
                ويجب أن تكون قادراً على أن تتحكم فيما إذا كان متصفحك يقبل
                الكوكيز وكيفية قبوله لها حيث أن معظم المتصفحات تقدّم تعليمات
                لكيفية إعادة ضبط المتصفح كي يرفض الكوكيز من خلال قسم “الدعم
                والمساعدة” في شريط الأدوات، غير أنك إذا رفضت “الكوكيز” من موقعنا
                فإن العديد من الخصائص والفوائد التي يقدّمها موقعنا لك قد لا تعمل
                كما ينبغي.
              </p>
            </div>

            <h5
              style={{
                color: "rgba(4, 32, 48, 1)",
                marginTop: "10px",
                fontWeight: "700",
              }}
            >
              {" "}
              الأطراف الثالثة
            </h5>

            <div className="d-flex justify-content-center align-items-center">
              <p
                style={{
                  margin: "10px 75px 15px 75px",
                  color: "rgba(99, 98, 112, 1)",
                  lineHeight: "26.73px",
                  width: "85",
                }}
              >
                يمكن لبعض الأطراف الثالثة مثل جوجل وفيسبوك وتويتر استخدام
                الكوكيز لتحديد المستخدم وتخصيص تجربة الإستخدام (كالإعلانات)
                استناداً إلى تفضيلاته على مواقع تلك الأطراف. يمكنك الإنسحاب من
                إستخدام الكوكيز لتحديد هويتك وتخصيص الإعلانات المقدمة من قبل
                جوجل حسب تفضيلاتك، الأطراف الثالثة تأخذ تلقائياً عنوان الإنترنت
                (IP) الخاص بك عند زيارة موقعنا. يمكن أيضاً إستخدام التقنيات
                الأخرى مثل الكوكيز من قبل الأطراف الثالثة لمعرفة طرق استخدامك
                للموقع وتفضيلاتك، وقياس مدى فاعلية إعلاناتهم أو تخصيص تلك
                الإعلانات لتناسب اهتماماتك. موقع منصة هداية التعليمية
                الإلكترونية ليس لديه أي وصول أو تحكم في الكوكيز التي تستخدمها
                هذه الأطراف الثالثة. لمزيد من المعلومات عن ممارسات الأطراف
                الثالثة والتعليمات عن كيفية تعطيل استخدام البيانات من قبلهم عليك
                إستشارة سياسة الخصوصية الخاصة بالطرف المعني. سياسة خصوصية المنصة
                التعليمية الإلكترونية لا تنطبق على أي من الأطراف الثالثة، ونحن
                لا نستطيع مراقبة أو التحكم بأنشطة تلك الأطراف بالمعلومات التي
                تجمعها عنك. إذا كنت ترغب في تعطيل الكوكيز، يمكنك فعل ذلك من خلال
                خيارات المتصفح الخاص بك. لمعلومات أكثر تفصيلاً حول إدارة الكوكيز
                في متصفحك يمكنك الإطلاع على المنصة الإلكترونية الخاص بالمتصفح.{" "}
              </p>
            </div>

            <h5
              style={{
                color: "rgba(4, 32, 48, 1)",
                marginTop: "10px",
                fontWeight: "700",
              }}
            >
              {" "}
              تسجيل الدخول عن طريق الشبكات الاجتماعية{" "}
            </h5>

            <div className="d-flex justify-content-center align-items-center">
              <p
                style={{
                  margin: "10px 50px 15px 50px",
                  color: "rgba(99, 98, 112, 1)",
                  lineHeight: "26.73px",
                  width: "85",
                }}
              >
                حين تقوم بتسجيل دخولك إلى منصة هداية التعليمية الإلكترونية عن
                طريق أحد الشبكات الإجتماعية (من أجل التعليق في المنصة) فإننا
                نقوم بجمع بعض المعلومات عنك مثل اسمك، صورتك الشخصية، رقم تعريف
                حسابك أو (ID) البريد الإلكتروني الخاص بك وموقع الويب الخاص بك.{" "}
              </p>
            </div>

            <h5
              style={{
                color: "rgba(4, 32, 48, 1)",
                marginTop: "10px",
                fontWeight: "700",
              }}
            >
              {" "}
              روابط المنصة إلى مواقع إلكترونية خارجية
            </h5>

            <div className="d-flex justify-content-center align-items-center">
              <p
                style={{
                  margin: "10px 75px 15px 75px",
                  color: "rgba(99, 98, 112, 1)",
                  lineHeight: "26.73px",
                  width: "85",
                }}
              >
                قد تحتوي منصة هداية على روابط إلى مواقع إلكترونية للغير كمزودي
                محتوى آخرين وبعض مزودي الخدمات، غير أن هذه المواقع الأخرى ليست
                تحت إدارتنا وبذلك عليك أن تتفهم وتوافق على أننا لا نتحمل مسؤولية
                جمع هذه المواقع واستخدامها لمعلوماتك ما لم تتم الإشارة له بغير
                ذلك في سياسة الخصوصية هذه. نوصيكم بالحرص عندما يتم توجيهكم إلى
                موقع الغير لتقوموا بمراجعة سياسات الخصوصية لكل موقع تزورونه
                وتستخدمونه.
              </p>
            </div>

            <h5
              style={{
                color: "rgba(4, 32, 48, 1)",
                marginTop: "10px",
                fontWeight: "700",
              }}
            >
              {" "}
              تغييرات سياسة الخصوصية
            </h5>

            <div className="d-flex justify-content-center align-items-center">
              <p
                style={{
                  margin: "10px 75px 50px 75px",
                  color: "rgba(99, 98, 112, 1)",
                  lineHeight: "26.73px",
                  width: "85",
                }}
              >
                يرجى الأخذ بعين الاعتبار أننا نقوم بمراجعة سياسة الخصوصية هذه
                دورياً وقد نُجري عليها بعض التغييرات، عندما نُجري أية تغييرات
                فإن رابط سياسة الخصوصية سيحتوي إشارة “مراجعة حديثة (مع التاريخ)”
                مما يشير إلى وجوب مراجعتك للأحكام الجديدة التي تعتبر سارية فور
                نشر السياسة الجديدة على هذه الصفحة لمنصة هداية{" "}
              </p>
            </div> */}
          </Col>

         ))}
              </>
            ) : <div style={{height:'280px'}}><img src={nodata}                         alt=""
            /> <br/>
            <span style={{fontWeight:'700'}}>{t('nodata1')}</span><br/>
            <span>{t('nodata2')}</span></div>
          
            ) :     <div style={{height:'280px'}}>  <Spinner animation="border" variant="primary" /></div>
          }
      
          
          
        </Row>
      </Container>
    </>
  );
};
export default ConditionsAndRoles;
