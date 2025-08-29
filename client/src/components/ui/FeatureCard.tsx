
type featureProps = {
    title: string;
    description: string;
}

const FeatureCard = ({title, description}: featureProps) => {
  return (
    <div className="p-2 pb-3 bg-light-fg dark:bg-dark-fg rounded-lg border-2 border-light-bd dark:border-dark-bd flex flex-col gap-1">
        <h6 className="font-semibold"> {title} </h6>
        <p> {description} </p>
    </div>
  )
}

export default FeatureCard