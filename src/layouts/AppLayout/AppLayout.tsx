import PageFooter from '~/components/footer'
import PageHeader from '~/components/header'

interface Props {
  children?: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <div>
      <PageHeader />
      {children}
      <PageFooter />
    </div>
  )
}
