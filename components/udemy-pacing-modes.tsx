import {
  UDEMY_PACING_MODES,
  UDEMY_PACING_VERSION,
} from '@/lib/udemy-pacing-modes';

export function UdemyPacingModes() {
  return (
    <table>
      <caption className="sr-only">
        Udemy Reset Progress speed modes in version {UDEMY_PACING_VERSION}
      </caption>
      <thead>
        <tr>
          <th scope="col">Mode</th>
          <th scope="col">Between clicks</th>
          <th scope="col">Pause</th>
          <th scope="col">Pause length</th>
        </tr>
      </thead>
      <tbody>
        {UDEMY_PACING_MODES.map((mode) => (
          <tr key={mode.name}>
            <th scope="row">{mode.name}</th>
            <td>{mode.delay}</td>
            <td>{mode.batch}</td>
            <td>{mode.pause}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
