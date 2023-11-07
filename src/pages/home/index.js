import Cabecalho from "@/components/Cabecalho"
import Project from "@/components/Cadastar/Project"
import Styles from "./styles.module.css"
import ListCard from "@/components/ListCard"

export default function Home() {

  return (
    <>
      <div className={Styles.body}>
        <Cabecalho />
        <div className={Styles.container}>
          <div className={Styles.project}>
            <Project />
          </div>
          <hr />
          <div className={Styles.listcard}>
            <ListCard />
          </div>
        </div>
      </div>
    </>
  )
}